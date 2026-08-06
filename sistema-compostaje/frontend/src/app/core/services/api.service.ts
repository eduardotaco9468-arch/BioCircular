import { Injectable } from '@angular/core';

export const API_BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  readonly baseUrl = API_BASE_URL;

}