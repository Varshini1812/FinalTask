import { Injectable } from '@angular/core';
import {MatDialog} from '@angular/material/dialog'
import { ProductAddComponent } from './product-add/product-add.component';

@Injectable({
  providedIn: 'root'
})
export class ProductAddDialogService {
  constructor(private dialog: MatDialog) {}

  openProductAddDialog(): void {
    const dialogRef = this.dialog.open(ProductAddComponent, {
      width: '700px', 
      disableClose: true 
    });

    
    dialogRef.afterClosed().subscribe(() => {
      console.log('Product add dialog closed');
      
    });
  }
}
