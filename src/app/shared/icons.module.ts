import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import { Home, File, User, LogOut, Search, Plus, ArrowRight, Edit3, Clock, Calendar } from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
    Home, File, User, LogOut, Search, Plus, ArrowRight, Edit3, Clock, Calendar
};

@NgModule({
    imports: [
        FeatherModule.pick(icons)
    ],
    exports: [
        FeatherModule
    ]
})
export class IconsModule { }
