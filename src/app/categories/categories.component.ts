import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Category } from '../models/category';
import { CategoriesService } from '../services/categories.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent implements OnInit {

  categoryArray: Array<object>;
  formCategory: string;
  formStatus: string = 'Add';
  categoryId: string;

  constructor(private categoryService: CategoriesService) { }

  ngOnInit(): void {

    this.categoryService.loadData().subscribe(val => {
      console.log(val);
      this.categoryArray = val;
    })

  }

  onSubmit(formData) {

    let categoryData: Category = {
      category: formData.value.category
    }

    if (this.formStatus == 'Add') {
      this.categoryService.saveData(categoryData);
      formData.reset();
    }
    else if (this.formStatus == 'Edit') {
      this.categoryService.updateData(this.categoryId, categoryData);
      formData.reset();
      this.formStatus = 'Add';
    }




    // let subCategoryData = {
    //   subCategory: 'subCategory1'
    // }

    // this.afs.collection('categories').add(categoryData).then(docRef => {
    //   console.log(docRef);

    //   // this.afs.doc(`categories/${docRef.id}`).collection('subcategories').add(subCategoryData)
    //   this.afs.collection('categories').doc(docRef.id).collection('subcategories').add(subCategoryData).then(docRef1 => {
    //     console.log(docRef1);


    //     // this.afs.doc(`categories/${docRef.id}/subcategories/${docRef1.id}`).collection('subsubcategories').add(subCategoryData)

    //     this.afs.collection('categories').doc(docRef.id).collection('subcategories').doc(docRef1.id).collection('subsubcategories').add(subCategoryData).then(docRef2 => {
    //       console.log('Second Level Subcategory Saved Successfully');

    //     });

    //   })

    // })
    // .catch(err => { console.log(err) })

  }

  onEdit(category, id) {
    this.formCategory = category;
    this.formStatus = 'Edit';
    this.categoryId = id;
  }

  onDelete(id) {
    this.categoryService.deleteData(id);
  }
}
