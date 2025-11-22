import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { TuiRootModule, TuiDialogModule, TuiAlertModule, TUI_SANITIZER, TuiButtonModule } from "@taiga-ui/core";
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MobileFooterComponent } from "./components/mobile-footer/mobile-footer.component";
import { MobileHeaderComponent } from "./components/mobile-header/mobile-header.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TuiRootModule, TuiDialogModule, TuiAlertModule, TuiButtonModule, MobileFooterComponent, MobileHeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
    providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
})
export class AppComponent {
  title = 'sabantui';
  a = 'tuiIconCheck'
}
