import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BreakpointService {
  useSidenavSubj = new BehaviorSubject<boolean>(false);
  useSidenav$ = this.useSidenavSubj.asObservable();  

  constructor(private breakpointObs: BreakpointObserver) {
    breakpointObs.observe([      
      Breakpoints.HandsetLandscape,
      Breakpoints.HandsetPortrait,
      Breakpoints.TabletPortrait
    ]).subscribe((result) => {
      if (result.breakpoints[Breakpoints.HandsetPortrait] ||
        result.breakpoints[Breakpoints.HandsetLandscape] ||
        result.breakpoints[Breakpoints.TabletPortrait]) {        
        this.useSidenavSubj.next(true)
      } else {        
        this.useSidenavSubj.next(false);
      }
    })
  }
}
