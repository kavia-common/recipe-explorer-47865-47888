import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Recipe } from '../models/recipe.model';
import { environment } from '../../environments/environment';
import { MOCK_RECIPES } from './mock-data';

@Injectable({ providedIn: 'root' })
export class RecipeService {
  private http = inject(HttpClient);

  private get baseUrl(): string {
    // Read from Angular environment. If deployment injects a global at runtime,
    // a future enhancement could merge it here safely.
    return (environment as any)?.NG_APP_API_BASE || '';
  }

  // PUBLIC_INTERFACE
  listRecipes(query?: string): Observable<Recipe[]> {
    const useMock = !this.baseUrl;
    if (useMock) {
      return of(this.filter(MOCK_RECIPES, query));
    }

    const url = `${this.baseUrl.replace(/\/+$/, '')}/recipes`;
    const params = query ? { q: query } as any : undefined;

    return this.http.get<Recipe[]>(url, { params }).pipe(
      map((data) => this.filter(data, query)),
      catchError((err) => {
        console.warn('API failed, using mock data. Error:', err);
        return of(this.filter(MOCK_RECIPES, query));
      })
    );
  }

  // PUBLIC_INTERFACE
  getRecipeById(id: string): Observable<Recipe> {
    const useMock = !this.baseUrl;
    if (useMock) {
      const found = MOCK_RECIPES.find(r => r.id === id);
      return found ? of(found) : throwError(() => new Error('Recipe not found'));
    }

    const url = `${this.baseUrl.replace(/\/+$/, '')}/recipes/${encodeURIComponent(id)}`;
    return this.http.get<Recipe>(url).pipe(
      catchError((err) => {
        console.warn('API failed, using mock data. Error:', err);
        const found = MOCK_RECIPES.find(r => r.id === id);
        return found ? of(found) : throwError(() => new Error('Recipe not found'));
      })
    );
  }

  private filter(recipes: Recipe[], query?: string): Recipe[] {
    if (!query) return recipes;
    const q = query.toLowerCase().trim();
    return recipes.filter(r =>
      r.title.toLowerCase().includes(q) ||
      r.description?.toLowerCase().includes(q) ||
      (r.ingredients || []).some(i => i.toLowerCase().includes(q)) ||
      (r.tags || []).some(t => t.toLowerCase().includes(q))
    );
  }
}
