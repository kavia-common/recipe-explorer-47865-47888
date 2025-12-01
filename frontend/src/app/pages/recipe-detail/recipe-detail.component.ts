import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';

@Component({
  selector: 'app-recipe-detail',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div>
    <a routerLink="/" class="btn ghost" style="margin-bottom:1rem;">← Back to list</a>

    <div *ngIf="loading" class="loading" style="padding:.5rem 0;">
      <span class="spinner" aria-hidden="true"></span>
      <span>Loading recipe...</span>
    </div>
    <div *ngIf="error" style="color: var(--color-error); padding:.25rem 0;">
      {{ error }}
    </div>

    <article *ngIf="recipe" class="card" style="overflow:hidden;">
      <div style="position:relative; aspect-ratio: 16/6; background:#e5e7eb;">
        <img [src]="recipe.imageUrl || placeholder" alt="{{recipe.title}}"
             style="width:100%; height:100%; object-fit:cover; display:block;">
        <div class="badge" style="position:absolute; top:.8rem; left:.8rem;">
          ★ {{ (recipe.rating || 0) | number:'1.1-1' }}
        </div>
      </div>

      <div style="padding:1.1rem; display:grid; gap:1rem; grid-template-columns: 1fr; ">
        <header>
          <h2 style="font-size:1.5rem; font-weight:800;">{{ recipe.title }}</h2>
          <p style="color:#4b5563; margin-top:.25rem;">{{ recipe.description }}</p>
        </header>

        <section style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:1rem;">
          <div class="card" style="padding:1rem;">
            <h3 style="font-weight:700; margin-bottom:.5rem;">Ingredients</h3>
            <ul style="display:grid; gap:.4rem; padding-left: 1rem;">
              <li *ngFor="let ing of recipe.ingredients" style="list-style: disc;">{{ ing }}</li>
            </ul>
          </div>

          <div class="card" style="padding:1rem;">
            <h3 style="font-weight:700; margin-bottom:.5rem;">Instructions</h3>
            <ol style="display:grid; gap:.6rem; padding-left: 1rem;">
              <li *ngFor="let step of recipe.steps; let i = index" style="list-style: decimal;">
                <span style="font-weight:600;">Step {{ i + 1 }}:</span> {{ step }}
              </li>
            </ol>
          </div>
        </section>
      </div>
    </article>
  </div>
  `,
})
export class RecipeDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private service = inject(RecipeService);

  recipe?: Recipe;
  loading = false;
  error = '';
  placeholder = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=1200&auto=format&fit=crop';

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (!id) {
      this.error = 'Invalid recipe id.';
      return;
    }
    this.fetch(id);
  }

  private fetch(id: string) {
    this.loading = true;
    this.error = '';
    this.service.getRecipeById(id).subscribe({
      next: (data) => {
        this.recipe = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'Recipe not found.';
        this.loading = false;
      }
    });
  }
}
