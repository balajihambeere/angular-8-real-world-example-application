import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MessageService, ApiService, ErrorHandlerService, JwtService, StringBuilderService } from './services';

@NgModule({
    declarations: [

    ],
    imports: [
        BrowserModule,
    ],
    providers: [
        MessageService,
        ApiService,
        ErrorHandlerService,
        JwtService,
        StringBuilderService
    ],
})
export class SharedModule { }
