import { CommonModule } from "@angular/common";
import { Component, signal } from "@angular/core";
import {
  trigger,
  transition,
  style,
  animate,
  stagger,
  query,
} from "@angular/animations";

@Component({
  selector: "app-home",
  imports: [CommonModule],
  templateUrl: "./home.component.html",
  styleUrl: "./home.component.css",
  animations: [
    // Navbar slide down
    trigger("navAnim", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-20px)" }),
        animate("400ms ease-out"),
      ]),
    ]),

    // Hero stagger animation
    trigger("heroAnim", [
      transition(":enter", [
        query("*", [
          style({ opacity: 0, transform: "translateY(20px)" }),
          stagger(120, [
            animate(
              "500ms ease-out",
              style({ opacity: 1, transform: "translateY(0)" })
            ),
          ]),
        ]),
      ]),
    ]),

    // Highlight cards animation
    trigger("cardAnim", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(30px)" }),
        animate(
          "500ms 100ms ease-out",
          style({ opacity: 1, transform: "translateY(0)" })
        ),
      ]),
    ]),
  ],
})
export class HomeComponent {
  private fullName = "Denis Kipyegon";
  typedName = signal("");
  private charIndex = 0;
  private isDeleting = false;
  private typingInterval!: number;

  ngOnInit(): void {
    this.startTyping();
  }

  ngOnDestroy(): void {
    clearInterval(this.typingInterval);
  }

  private startTyping(): void {
    this.typingInterval = window.setInterval(
      () => {
        if (!this.isDeleting) {
          // Typing
          this.typedName.update((value) =>
            this.fullName.slice(0, value.length + 1)
          );

          if (this.typedName().length === this.fullName.length) {
            setTimeout(() => (this.isDeleting = true), 1200);
          }
        } else {
          // Deleting
          this.typedName.update((value) => value.slice(0, -1));

          if (this.typedName().length === 0) {
            this.isDeleting = false;
          }
        }
      },
      this.isDeleting ? 60 : 120
    );
  }

  title = signal("Angular Frontend Developer | Fintech");

  description = signal(
    `I build high-performance enterprise and banking applications using
     Angular, NgRx, Signals & Micro Frontends.`
  );

  highlights = signal([
    "5+ Enterprise Applications",
    "Fintech Experience",
    "Angular Performance Optimization",
    "Core Banking (Finacle)",
  ]);

  cvUrl = "assets/Denis_Kipyegon_CV.pdf";
}
