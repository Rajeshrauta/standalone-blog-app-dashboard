import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(
    private storage : AngularFireStorage, 
    private afs : AngularFirestore, 
    private toastr : ToastrService,
    private router : Router
  ){ }

  uploadImage(selectedImage, postData, formStatus, id) {
    const filePath = `postIMG/${Date.now()}`;
    
    this.storage.upload(filePath,selectedImage).then(() =>{
      console.log('Image uploaded successfully');

      this.storage.ref(filePath).getDownloadURL().subscribe(url => {
        postData.postImgPath = url;

        if(formStatus === "Edit"){
          this.updateData(id, postData);
        }
        else{
          this.saveData(postData);
        }
        
      });
    });
  }

  saveData(postData){
    this.afs.collection('posts').add(postData).then(docRef => {
      this.toastr.success("Data Inserted Successfully.");
      this.router.navigate(['/posts']);
    });
  }

  loadData() {
    return this.afs.collection('posts').snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, data }
        })
      })
    )
  }

  loadOneData(id){
    // return this.afs.collection('posts').doc(id).valueChanges();

    return this.afs.doc(`posts/${id}`).valueChanges();
  }

  updateData(id,postData){
    this.afs.doc(`posts/${id}`).update(postData).then(() => {
      this.toastr.success("Data Updated successfully.");
      this.router.navigate(['/posts']);
    });
  }

  deleteImage(postImgPath,id){
    this.storage.storage.refFromURL(postImgPath).delete().then(() => {
      this.deleteData(id);
    });
    
  }

  deleteData(id){
    this.afs.doc(`posts/${id}`).delete().then(() => {
      this.toastr.warning("Data Deleted successfully.");
    });
  }

  markFeatured(id, featuredData) {
    this.afs.doc(`posts/${id}`).update(featuredData).then(() => {
      this.toastr.success("Feature Status Updated.");
    });
  }
}
