import { Component, OnInit, OnDestroy } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';
import { SpeechRecognitionService } from '../core/speech-recognition.service';



@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css']
    
})
export class ProductListComponent implements OnInit,OnDestroy {
   
    pageTitle: string = 'Product List';
    imageWidth: number = 50;
    imageMargin: number = 2;
    showImage: boolean = false;
    errorMessage: string;
    showSearchButton: boolean;
    _speechData: string;

    _listFilter: string;
    get listFilter(): string {
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }


    get speechData(): string {
        return this._listFilter;
    }
    set speechData(value: string) {
        this._listFilter = value;
        this.filteredProducts = this.listFilter ? this.performFilter(this.listFilter) : this.products;
    }


    filteredProducts: IProduct[];
    products: IProduct[] = [];
    

        constructor(private _productService: ProductService,
                    private speechRecognitionService: SpeechRecognitionService){
                        this.showSearchButton = true;
                        this.speechData = "";
            
            
        }

        
    
        ngOnInit(): void {
             this._productService.getProducts().subscribe(
                 products =>{
                     this.products = products;
                     this.filteredProducts = this.products;
                 },
                 error => {
                     this.errorMessage = <any>error;
                 }
             );
  
            
        }

        ngOnDestroy() {
            this.speechRecognitionService.DestroySpeechObject();
        }

        toggleImage(): void{
            this.showImage = !this.showImage;
        }

      
   
        performFilter(filterBy: string): IProduct[] {
            filterBy = filterBy.toLocaleLowerCase();
            return this.products.filter((product: IProduct) =>
                  product.productName.toLocaleLowerCase().indexOf(filterBy) !== -1);
        }

        onRatingClicked(message: string): void{
            this.pageTitle = 'Product List: '+ message;
        }


        activateSpeechSearchMovie(): void {
            this.showSearchButton = false;
      
            this.speechRecognitionService.record()
                .subscribe(
                //listener
                (value) => {
                    this.speechData = value;
                    console.log(value);
                },
                //errror
                (err) => {
                    console.log(err);
                    if (err.error == "no-speech") {
                        console.log("--restatring service--");
                        this.activateSpeechSearchMovie();
                    }
                },
                //completion
                () => {
                    this.showSearchButton = true;
                    console.log("--complete--");
                    this.activateSpeechSearchMovie();
                });
        }

   
}