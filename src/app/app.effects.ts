import { Injectable } from '@angular/core';
import { TshirtEffects } from 'src/app/reducer/t-store.effects';

@Injectable()
export class AppGlobalEffects {
  constructor() {}
}

export const AppEffects = [
  AppGlobalEffects,
  TshirtEffects
];
