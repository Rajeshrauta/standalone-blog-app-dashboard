import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../models/post';
import { CategoriesService } from '../../services/categories.service';
import { PostsService } from '../../services/posts.service';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [AngularEditorModule,CommonModule,HttpClientModule,ReactiveFormsModule],
  templateUrl: './new-post.component.html',
  styleUrl: './new-post.component.css'
})
export class NewPostComponent {
  permalink: string = "";
  imgSrc: any = './assets/placeholder-image.png';
  selectedImg: any;
  categories: Array<object>;
  post: any;

  formStatus: string = "Add new";
  docId: string;

  postForm: FormGroup;
  constructor(
    private categoryService: CategoriesService,
    private fb: FormBuilder,
    private postService: PostsService,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe(val => {
      this.docId = val.id;

      if (this.docId) {
        this.postService.loadOneData(val.id).subscribe(post => {
          this.post = post;

          this.postForm = this.fb.group({
            title: [this.post.title, [Validators.required, Validators.minLength(10)]],
            permalink: [this.post.permalink, Validators.required],
            except: [this.post.except, [Validators.required, Validators.minLength(50)]],
            category: [`${this.post.category.categoryId}-${this.post.category.category}`, Validators.required],
            postImg: ['', Validators.required],
            content: [this.post.content, Validators.required],
          });
          this.imgSrc = this.post.postImgPath;
          this.formStatus = "Edit";
        });
      }
      else {
        this.postForm = this.fb.group({
          title: ['', [Validators.required, Validators.minLength(10)]],
          permalink: ['', Validators.required],
          except: ['', [Validators.required, Validators.minLength(50)]],
          category: ['', Validators.required],
          postImg: ['', Validators.required],
          content: ['', Validators.required],
        });
      }
    });
  }

  ngOnInit() {
    this.categoryService.loadData().subscribe(val => {
      this.categories = val;
    })
  }

  get fc() {
    return this.postForm.controls;
  }
  onTitleChange($event) {
    const title = $event.target.value;
    this.postForm.patchValue({
      permalink: title.replace(/\s/g, '-')
    });
  }


  showPreview($event) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imgSrc = e.target.result;
    }

    reader.readAsDataURL($event.target.files[0]);
    this.selectedImg = $event.target.files[0];
  }

  onSubmit() {
    let splitted = this.postForm.value.category.split('-');

    const postData: Post = {
      title: this.postForm.value.title,
      permalink: this.postForm.value.permalink,
      except: this.postForm.value.except,
      category: {
        categoryId: splitted[0],
        category: splitted[1]
      },
      postImgPath: '',
      content: this.postForm.value.content,
      isFeatured: false,
      views: 0,
      status: 'new',
      createdAt: new Date()
    }

    this.postService.uploadImage(this.selectedImg, postData, this.formStatus, this.docId);
    this.postForm.reset();
    this.imgSrc = './assets/placeholder-image.png';
  }
}
