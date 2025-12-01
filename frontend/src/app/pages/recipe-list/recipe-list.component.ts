import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { RecipeCardComponent } from '../../components/recipe-card/recipe-card.component';
import { Recipe } from '../../models/recipe.model';
import { Subscription, debounceTime, distinctUntilChanged, map, Subject } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RecipeCardComponent],
  template: `
  <section style="display:flex; flex-direction:column; gap:1rem;">
    <div class="card" style="padding:1rem; background:var(--color-surface);">
      <div style="display:flex; gap:.75rem; flex-wrap:wrap; align-items:center;">
        <input class="input" type="text" placeholder="Search by name or ingredient..."
               [(ngModel)]="query" (ngModelChange)="onQueryChange($event)"
               style="flex:1 1 320px;">
        <button class="btn" (click)="refresh()">
          <span class="material-symbols-outlined" aria-hidden="true">search</span>
          Search
        </button>
      </div>
    </div>

    <div *ngIf="loading" class="loading" style="padding:.5rem 0;">
      <span class="spinner" aria-hidden="true"></span>
      <span>Loading recipes...</span>
    </div>
    <div *ngIf="error" style="color: var(--color-error); padding:.25rem 0;">
      {{ error }}
    </div>

    <div style="display:grid; grid-template-columns: repeat( auto-fill, minmax(260px, 1fr) ); gap:1rem;">
      <app-recipe-card *ngFor="let r of recipes" [recipe]="r"></app-recipe-card>
    </div>

    <div *ngIf="!loading && recipes?.length === 0" class="card" style="padding:1.2rem; text-align:center;">
      <p>No recipes found.</p>
    </div>
  </section>
  `,
})
export class RecipeListComponent implements OnInit, OnDestroy {
  private service = inject(RecipeService);

  recipes: Recipe[] = [];
  loading = false;
  error = '';
  query = '';

  private query$ = new Subject<string>();
  private sub = new Subscription();

  ngOnInit(): void {
    this.sub.add(
      this.query$.pipe(
        map(q => q.trim()),
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(q => this.fetch(q))
    );
    this.fetch('');
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onQueryChange(q: string) {
    this.query$.next(q);
  }

  refresh() {
    this.fetch(this.query);
  }

  private fetch(q: string) {
    this.loading = true;
    this.error = '';
    this.service.listRecipes(q).subscribe({
      next: (data) => {
        this.recipes = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = err?.message || 'Failed to load recipes.';
        this.loading = false;
      }
    });
  }
}
