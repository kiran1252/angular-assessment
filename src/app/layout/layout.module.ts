import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports:[SharedModule],
  declarations: [SidebarComponent, HeaderComponent, FooterComponent],
  exports: [SidebarComponent, HeaderComponent, FooterComponent],
})
export class LayoutModule {}
