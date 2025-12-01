import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <article class="card" style="display:flex; flex-direction:column; height:100%;" *ngIf="recipe">
    <a [routerLink]="['/recipe', recipe.id]" style="display:block;">
      <div style="position:relative; aspect-ratio: 16/10; overflow:hidden;">
        <img [src]="recipe.imageUrl || placeholder"
             [alt]="recipe.title"
             style="width:100%; height:100%; object-fit:cover; display:block; transition: transform .3s ease;"
             (load)="loaded=true"
             [style.transform]="loaded ? 'scale(1.0)' : 'scale(1.05)'">
        <div class="badge" style="position:absolute; top:.6rem; left:.6rem;">
          <span>★ {{ (recipe.rating || 0) | number:'1.1-1' }}</span>
        </div>
      </div>
    </a>
    <div style="padding: .9rem .95rem; display:flex; flex-direction:column; gap:.4rem; flex:1;">
      <a [routerLink]="['/recipe', recipe.id]">
        <h3 style="font-size:1rem; line-height:1.4; font-weight:700;">
          {{ recipe.title }}
        </h3>
      </a>
      <p style="font-size:.9rem; color:#4b5563; flex:1;">
        {{ recipe.description }}
      </p>
      <div style="display:flex; justify-content:space-between; align-items:center; margin-top:.25rem;">
        <a class="btn" [routerLink]="['/recipe', recipe.id]">View</a>
        <div>
          <span *ngFor="let tag of (recipe.tags || []); let i = index"
                class="badge"
                [style.marginLeft.px]="i ? 6 : 0">{{ tag }}</span>
        </div>
      </div>
    </div>
  </article>
  `,
})
export class RecipeCardComponent {
  @Input() recipe!: Recipe;
  loaded = false;
  placeholder = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop';
}
