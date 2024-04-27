import { provideHttpClient } from "@angular/common/http"
import { HttpTestingController, provideHttpClientTesting } from "@angular/common/http/testing"
import { TestBed, waitForAsync } from "@angular/core/testing"
import { BookApiService } from "./book-api.service"
import { Book, bookNa } from "./models"
import { lastValueFrom } from "rxjs"

describe('BookApiService',()=>{
    let service:BookApiService;
    let mockApi:HttpTestingController
    beforeEach(async ()=>{
       await TestBed.configureTestingModule({
            providers:[provideHttpClient(), provideHttpClientTesting(),BookApiService]
        })
        service = TestBed.inject(BookApiService)
        mockApi = TestBed.inject(HttpTestingController)
    })

    it('sould get All Books', async ()=>{
        const books: Book[] = [
            {
                ...bookNa(),
                title: 'One'
            },
            {
                ...bookNa(),
                title: 'Two'
            },
            {
                ...bookNa(),
                title: 'Three'
            }
        ]

        const books$ = lastValueFrom(service.getAll())
        mockApi.expectOne('http://localhost:4730/books').flush(books)
        const respBooks = await books$

        expect(respBooks).toEqual(books.map(b =>({
            ...b,
            title:b.title.toUpperCase()
          })))
    })
})