import { Component, OnInit } from '@angular/core';
import { ReactorComponentComponent } from './components/reactor-component/reactor-component.component';
import { CommonModule } from '@angular/common';
import { Status } from '../../core/enums/status.enum';
import { ReactorModel } from '../../core/models/reactor.model';
import { Store } from '@ngxs/store';
import { FetchReactorsAction, ReactorsState } from '../../store/reactors';
import { Observable } from 'rxjs';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-reactor-list-page',
  imports: [ReactorComponentComponent, CommonModule, SharedModule],
  templateUrl: './reactor-list-page.component.html',
  styleUrl: './reactor-list-page.component.scss',
})
export class ReactorListPageComponent implements OnInit {
  reactors$!: Observable<ReactorModel[]>;
  loading$!: Observable<boolean>;
  Status = Status;
  constructor(private store: Store) {}
  ngOnInit(): void {
    this.store.dispatch(new FetchReactorsAction());
    this.reactors$ = this.store.select(ReactorsState.getReactors);
    this.loading$ = this.store.select(ReactorsState.loadingReactors);
  }

  scrollToReactor(id: string) {
    document.getElementById(id)?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }
}
