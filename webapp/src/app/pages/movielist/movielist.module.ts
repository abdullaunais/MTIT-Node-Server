import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgaModule } from '../../theme/nga.module';

import { MovieList } from './movielist.component';
import { routing }       from './movielist.routing';
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgaModule,
    Ng2SmartTableModule,
    routing
  ],
  declarations: [
    MovieList
  ],
  providers: [
  ]
})
export class MovieListModule {}
