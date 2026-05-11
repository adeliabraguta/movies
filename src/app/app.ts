import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Breadcrumb } from './components/breadcrumb/breadcrumb';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Breadcrumb],
  templateUrl: './app.html',
  standalone: true,
  styleUrl: './app.css',
})
export class App {}
