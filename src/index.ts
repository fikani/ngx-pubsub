import { NgModule, ModuleWithProviders } from '@angular/core';
import { SubscriptionService } from './subscription.service'

export * from './subscription.service';

@NgModule({
  imports: [
  ],
  declarations: [
  ],
  exports: [
  ], providers: [SubscriptionService]
})
export class PubSubModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: PubSubModule,
      providers: [SubscriptionService]
    };
  }
}
