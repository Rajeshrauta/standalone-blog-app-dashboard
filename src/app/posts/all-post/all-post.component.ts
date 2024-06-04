import { Component } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-all-post',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './all-post.component.html',
  styleUrl: './all-post.component.css'
})
export class AllPostComponent {

  postArray: Array<object>;

  constructor(private postService: PostsService) { }

  ngOnInit() {
    this.postService.loadData().subscribe(data => {
      console.log(data);
      this.postArray = data
    });
  }

  onDelete(postImgPath, id) {
    this.postService.deleteImage(postImgPath, id);
  }

  onFeatured(id, value) {
    const featuredData = {
      isFeatured: value
    }

    this.postService.markFeatured(id, featuredData);
  }

}
