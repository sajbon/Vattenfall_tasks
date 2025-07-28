# FrontEnd tasks

## Favicon <span id="json-content-1"></span>

<details>
<summary>Expand details</summary>

### Description
The goal of this task is to add a favicon to the website.
### Expected outcome
After serving the app favicon should be now the one visible in figma instead of Angular logo.
### Tips
<details>
    <summary>If you don't know how to get the file: </summary>
    <p class="hint">Ask UX for .ico file </p>
</details>

<details>
    <summary>If you want to replace favicon.ico name in code </summary>
    <p class="hint">Rethink </p>
</details>

<details>
    <summary>Code </summary>
    <p class="hint"> <code>&lt;link rel="icon" type="image/x-icon" href="favicon.ico"&gt;</code>
Added in index.html file  </p>
</details>
</details>

## Back to Home page button <span id="json-content-2"></span>
<details>
<summary>Expand details</summary>

### Description
As a user I want to have easy way to go back to home page.
### Expected outcome
After clicking home button user will be redirected to home page. Once the user is on the home page, nothing should happen.

#### Wireframe
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-4110&t=oeB0VM1YOR7OOK14-1
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-1263&t=bROx8WGGPi1ptpha-1
### Tips
<details>
    <summary>Tip 1 </summary>
    <p class="hint">Learn about routing in Angular</p>
</details>

<details>
    <summary>Tip 2 </summary>
    <p class="hint">Learn about events such as click in JavaScript/TypeScript and how to implement them in Angular</p>
</details>

<details>
<p class="hint">In header.component.html: </p>
    <summary>Code</summary>
<code>  &lt;a class="header__icon__wrapper header__icon__wrapper__link" href="#welcome" *ngIf="isHome |async"&gt;&lt;span
      class="header__icon__wrapper__icon header__icon__wrapper__icon--home"&gt;&lt;/span&gt;Home&lt;/a&gt;
  &lt;a class="header__icon__wrapper header__icon__wrapper__link" href="#welcome" *ngIf="!(isHome | async)"&gt;&lt;span
      class="header__icon__wrapper__icon header__icon__wrapper__icon--back"&gt;&lt;/span&gt;Return home&lt;/a&gt;
</code>
<p class="hint">In header.component.ts: </p>
<code>
export class HeaderComponent implements OnInit {
  isHome: Observable&lt;boolean&gt; = of(true);

ngOnInit(): void {
const currentLocation = window.location.href;
if (currentLocation.includes('reactors')) {
this.isHome = of(false);
}}}
</code>
<p class="hint">In header.component.scss: </p>
<code>
 &__icon__wrapper {
    display: flex;
    align-items: center;
    width: 25rem;
    text-decoration: none;
    &__link {
      color: black;
    }
    &__icon {
      width: 3rem;
      height: 3rem;
      display: inline-block;
      margin-right: 1rem;
      &--home {
        background-image: url("../../../../assets/icons/home.svg");
      }
      &--back {
        background-image: url("../../../../assets/icons/arrow-left.svg");
        filter: invert(33%) sepia(83%) saturate(828%) hue-rotate(175deg)
          brightness(93%) contrast(88%);
      }
    }
}
</code>
</details>
</details>

## Our locations <span id="json-content-3"></span>

<details>
<summary>Expand details</summary>

### Description
As a user, I would like to see a map, that shows location of our 3 reactors, on our Home Page, so I can quickly get to know where they are located.

#### Wireframe
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-1117&t=nUM1QRaiXRkL535s-0
### Expected outcome
Image with reactors locations is displayed in correct section on Home Page.

### Tips
<details>
    <summary>Tip 1 </summary>
    <p class="hint">Ask UX for image</p>
</details>

<details>
    <summary>Tip 2 </summary>
    <p class="hint">Align images with accesibility rules </p>
</details>
<details>
<summary>Code</summary>
<p class="hint">Add new fields to reactor-state.model.ts : </p>
<code>
  locationsImage?: ImageModel;
  loadingLocationImage: boolean;
</code>

<p class="hint">Add FetchReactorsLocationImageAction In reactors.actions.ts</p>
<code>
export class FetchReactorsLocationImageAction {
  public static readonly type = '[Reactors]FetchReactorsLocationImageAction';
  constructor() {}
}
</code>
<p class="hint">Add action and selectors in reactor.state.ts and update @state with new fields "locationImage" and "loadingLocationImage"</p>
<code>
@State&lt;ReactorsStateModel&gt;({
  name: 'reactors',
  defaults: {
    reactors: [],
    reactorsImages: [],
    reactorsSafetyStatus: undefined,
    locationsImage: undefined,
    loadingLocationImage: false,
    loadingReactors: false,
    loadingReactorsImages: false,
    loadingSafetyStatus: false,
    errorLocationImage: false,
    errorReactors: false,
    errorReactorsImages: false,
    errorSafetyStatus: false,
  },
})
</code>
<code>
  @Selector()
  static loadingLocationImage(state: ReactorsStateModel): boolean {
    return state.loadingLocationImage;
  }
  @Selector()
  static getReactorsLocationImage(
    state: ReactorsStateModel
  ): ImageModel | void {
    return state.locationsImage;
  }
</code>
<code>
@Action(FetchReactorsLocationImageAction)
fetchReactorsLocationImage(
  ctx: StateContext&lt;ReactorsStateModel&gt;
): Observable&lt;ReactorsStateModel&gt; | Observable&lt;void&gt; {
  ctx.patchState({ loadingLocationImage: true });

return this.serviceReactors.getReactorLocationImage().pipe(
map((response) =&gt; {
return ctx.patchState({
locationsImage: response,
loadingLocationImage: false,
});
}),
catchError((err) =&gt;
of(
ctx.patchState({
errorLocationImage: true,
loadingLocationImage: false,
})
)
)
);
}
</code>
<p class="hint">In welcome.component.ts add locationImage$, locationImageLoading$ and in dispatch</p>
<code>
 locationImage$: Observable&lt;ImageModel | void&gt; = this.store.select(
    ReactorsState.getReactorsLocationImage
  );
  locationImageLoading$: Observable&lt;boolean&gt; = this.store.select(
    ReactorsState.loadingLocationImage
  );
</code>
    <p class="hint"> Add app-image, locationImageLoading$ and locationImage$ In welcome.component.html</p>
<code>
&lt;div class="welcome"
  *ngLet="{ safetyStatus: safetyStatus$ | async, locationImage: locationImage$ | async, reactorList: reactorList$ |async,  locationImageLoading: locationImageLoading$ | async, safetyStatusLoading: safetyStatusLoading$ | async, reactorListLoading: reactorListLoading$ |async} as data"&gt;
</code>
<code>
&lt;app-image [image]="data.locationImage" [style]="ImageType.standard"&gt;&lt;/app-image&gt;
</code>
<code>
ngOnInit() {
this.store.dispatch(new FetchSafetyStatusAction());
this.store.dispatch(new FetchReactorsImagesAction());
this.store.dispatch(new FetchReactorsLocationImageAction());
}
</code>
</details>
</details>

## Carousel - adjustments <span id="json-content-4"></span>

<details>
<summary>Expand details</summary>

### Description
Add headers with the name of each reactor

Add links under each reactor which shows correct component

#### Wireframe
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-4250&t=qx031GPk39d3y6Gb-1
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-1117&t=qx031GPk39d3y6Gb-1

### Expected outcome
After clicking to link with reactor 1 user will be redirected to reactor details.

### Tips
<details>
    <summary>Tip 1 </summary>
    <p class="hint">Learn more about anchor link</p>
</details>
<details>
    <summary>Code</summary>
  <p class="hint">In image.component.html: </p>
    <code>
&lt;div class="image"&gt;
    &lt;img class="image__image" [src]="image.imageContent" [alt]="image.name ? image.name : image.title"
        [width]="imageWidth" [height]="imageHeight" /&gt;
    &lt;ng-container *ngIf="style == ImageType.full"&gt;
        &lt;h3 class="image__title" *ngIf="style ==  ImageType.full"&gt;{{image.name ? image.name : image.title}}&lt;/h3&gt;
        &lt;p class="image__description" *ngIf="style == ImageType.full"&gt;{{image.description}}&lt;/p&gt;
        &lt;a class="image__more" href="reactors"&gt;Learn more &lt;/a&gt;
    &lt;/ng-container&gt;
&lt;/div&gt;
</code>
  </details>
</details>

## Footer - Links update <span id="json-content-5"></span>

<details>
<summary>Expand details</summary>

### Description
The goal of this task is to add links to the 2 sections in the footer.

#### Wireframe
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-4390&m=dev
### Expected outcome
After user clicks on a website link, it should open in a new tab.

Links:
- https://group.vattenfall.com/
- https://www.vattenfall.se/
- https://www.vattenfall.de/
- https://www.vattenfall.co.uk/
- https://www.vattenfall.dk/
- https://www.vattenfall.fi/
- https://group.vattenfall.com/nl

Section 2: Follow us:
x - https://twitter.com/vattenfallgroup
instagram - https://instagram.com/vattenfall
linkedin - https://www.linkedin.com/company/vattenfall
### Tips
<details>
    <summary>Tip 1 </summary>
    <p class="hint">Find how programm link to open in a new tab </p>
</details>

<details>
    <summary>Tip 2 </summary>
    <p class="hint">Remember about correct styling </p>
</details>
<details>
<summary>Code</summary>
    <p class="hint">In footer.component.html: </p>
<code>
    &lt;div class="footer__container__column"&gt;
      &lt;h5 class="footer__container__column__title"&gt;Vattenfall Websites&lt;/h5&gt;
      &lt;ul&gt;
        &lt;li&gt;Vattenfall.com&lt;/li&gt;
        &lt;li&gt;Vattenfall.se&lt;/li&gt;
        &lt;li&gt;Vattenfall.de&lt;/li&gt;
        &lt;li&gt;Vattenfall.co.uk&lt;/li&gt;
        &lt;li&gt;Vattenfall.dk&lt;/li&gt;
        &lt;li&gt;Vattenfall.fi&lt;/li&gt;
        &lt;li&gt;Vattenfall.com/nl&lt;/li&gt;
      &lt;/ul&gt;
    &lt;/div&gt;
    &lt;div class="footer__container__column"&gt;
      &lt;h5 class="footer__container__column__title"&gt;Follow us&lt;/h5&gt;
      &lt;div class="footer__container__column__icon"&gt;
        &lt;div class="footer__container__column__icon--twitter"&gt;&lt;/div&gt;
        &lt;div class="footer__container__column__icon--instagram"&gt;&lt;/div&gt;
        &lt;div class="footer__container__column__icon--linkedin"&gt;&lt;/div&gt;
      &lt;/div&gt;
    &lt;/div&gt;
</code>
 <p class="hint">In footer.component.scss:</p>
<code>
  &__column {
      margin-right: 3rem;
      max-width: 26.2rem;
      &__title {
        border-bottom: 1px solid $white;
        max-width: 25rem;
        margin-bottom: 1rem;
        padding-bottom: 1rem;
      }
      ul {
        list-style: none;
        padding: 0;
      }
      &__icon {
        display: flex;
        cursor: pointer;
        &--twitter {
          width: 2rem;
          height: 2rem;
          background-repeat: no-repeat;
          margin-right: 2rem;
          background-image: url(../../../../assets/icons/twitter.svg);
        }
        &--instagram {
          width: 1.9rem;
          height: 2rem;
          margin-right: 2rem;
          background-repeat: no-repeat;
          background-image: url(../../../../assets/icons/instagram.svg);
        }
        &--linkedin {
          width: 2rem;
          height: 1.9rem;
          background-repeat: no-repeat;
          background-image: url(../../../../assets/icons/linkedin.svg);
        }
      }
    }
</code>
   </details>
</details>

## Footer - Back to top <span id="json-content-6"></span>

<details>
<summary>Expand details</summary>

### Description
As a user, I would like to easily get back to the top of the page whenever I want. The goal of this task is to add a button that directs user to the top of the page, on which they currently are.

#### Wireframe
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-4390&m=dev
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-4440&m=dev
### Expected outcome

- "Back to top" is a clickable field
- Arrow is clickable

### Tips

<details>
    <summary>Tip 1 </summary>
    <p class="hint">Ailgn styling with differents states for better user experience like hover, focus. Learn more how to check this in dev tools. </p>
</details>
<details>
    <summary>Code</summary>
 <p class="hint">In footer.component.html: </p>
<code>  &lt;div class="footer__back-to-top" (click)="scrollToHeader()"&gt;
    &lt;div class="footer__back-to-top--arrow"&gt;
    &lt;/div&gt; Back to top
  &lt;/div&gt;
</code>
     <p class="hint">In footer.component.scss: </p>
<code>
  &__back-to-top {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding-left: 16rem;
    cursor: pointer;
    &--arrow {
      width: 3rem;
      height: 3rem;
      margin-right: 1rem;
      background-repeat: no-repeat;
      background-image: url(../../../../assets/icons/chevron_right.svg);
    }
    height: 4rem;
    color: $white;
    width: 91vw;
    background-color: #{$gray-blue};
    font-size: #{$font-size-m};
    font-weight: 400;
  }</code>
</details>
</details>

## Safety system status - part 1 - overall status<span id="json-content-7"></span>

<details>
<summary>Expand details</summary>

### Description
The goal of this task is to add a section that shows overall system status, as per design:
- overall power production output is shown for all 3 reactors
- overall core temperature is shown for all 3 reactors
- if any of the overall statuses is not in range warning should appear.
- status should be present in "Safety status system" section on Home Page

Power ranges for each reactor:

x < 10 - critical <br>
10 <= x < 50 - out of range <br>
50<= x < 250 - in range <br>
250 <= x < 300 - out of range <br>
x >= 300 - critical <br>

Core temp each reactor ranges:

x < 250 - critical <br>
250 <= x < 400 - out of range <br>
400 <= x < 800 - in range <br>
800<= x < 950 - out of range <br>
x >= 950 - critical <br>

#### Wireframe
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-712&t=TzpHDJlsbH7uLfHn-1
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-3379&m=dev

### Expected outcome
Component with real time data requested from database or mocks

### Tips
<details>
    <summary>Tip 1 </summary>
    <p class="hint">Learn about asynchronous programming</p>
</details>

<details>
    <summary>Tip 2 </summary>
    <p class="hint">How component behaves when request is pending? </p>
</details>
<details>
    <summary>Code</summary>
    <p class="hint">You need to create new Status component. </p>
    <p class="hint">In status.component.html: </p>
<code>
&lt;div class="safety-status"&gt;
    &lt;h4 class="safety-status__title"&gt;{{'global.statuses.status' |translate}}&lt;/h4&gt;
    &lt;div class="safety-status__status-container"&gt;
        &lt;span class="safety-status__status-container__item"&gt;
            {{'global.statuses.powerProd' |translate}} &lt;/span&gt;
        &lt;span class="safety-status__status-container__dot safety-status__status-container__dot--{{status.statusPowerProduction}}"&gt;&lt;/span&gt;
        &lt;span class="safety-status__status-container__item"&gt;
            {{'global.statuses.coreTemp' |translate}} &lt;/span&gt;
        &lt;span class="safety-status__status-container__dot safety-status__status-container__dot--{{status.statusCoreTemperature}}"&gt;&lt;/span&gt;
    &lt;/div&gt;&lt;/div&gt;
</code>
<p class="hint">In status.component.scss: </p>
<code>
@use"_variables" as *;

.safety-status {
width: 100%;
background-color: #{$light-blue};
display: flex;
flex-direction: row;
justify-content: space-between;
&__title {
margin-top: 1.8rem;
padding-left: 5%;
}
&__status-container {
display: grid;
width: 60%;
grid-template-columns: 6fr 1fr;
grid-row: auto auto;
margin: 1.5rem 1rem 1.5rem 2rem;
grid-row-gap: 1.5rem;
    &__item {
      align-self: center;
      justify-self: start;
    }
    &__dot {
      width: 3rem;
      height: 3rem;
      border-radius: 7rem;
      justify-self: center;
      align-self: center;
      &--in-range {
        background-color: #{$green};
      }
      &--out-of-range {
        background-color: #{$sollor-yellow};
      }
      &--critical {
        background-color: $red;
      }
    }}
}
</code>
<p class="hint">In status.component.ts: </p>
<code>
export class StatusComponent {
  @Input() status!: SafetyStatusModel;
}
</code>
<p class="hint">You need to create new Warning component</p>
  <p class="hint">In warning.component.html: </p>
<code>
&lt;div class="warning warning--{{warningType}}"&gt;
    &lt;div class="warning__icon-container"&gt;
        &lt;img class="warning__icon-container__icon" src="assets/icons/alert.svg"&gt;
    &lt;/div&gt;
    &lt;div class="warning__content"&gt; {{typeOfError}} of &lt;span class="warning__content__reactor-name"&gt;{{ reactorName
            }}&lt;/span&gt; has exeeded safe levels. Urgent attention
        required.
        &lt;br&gt;
        &lt;a href="reactors" class="warning__link" (click)="goToReactor($event)"&gt;See details&lt;/a&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code>
  <p class="hint">In warning.component.scss: </p>
<code>
@use"_variables" as *;

.warning {
display: flex;
flex-direction: row;
align-items: center;
height: 100%;
&__icon-container {
width: 7rem;
height: 7rem;
margin: 0 3rem;
align-content: center;
    &__icon {
      width: 3.8rem;
      height: 3.8rem;
    }
    border-radius: 20rem;
}
&__content {
text-align: left;
}
}
.warning--critical.warning {
background-color: $light-red;
.warning__icon-container {
background-color: $red;
}
}
.warning--out-of-range.warning{
background-color: $light-yellow;
.warning__icon-container {
background-color: $sollor-yellow;
}
}
</code>
<p class="hint">In warning.component.ts: </p>
<code>
export class WarningComponent implements OnInit {
  @Input() safetyStatus?: SafetyStatusModel;
  @Input() reactorStatus?: ReactorModel;
  @Input() warningStyle?: WarningStyle = WarningStyle.standard;
  @Output() scrollToElement = new EventEmitter&lt;any&gt;();
  typeOfError?: string;
  reactorName?: string;
  warningType: Status = Status.outOfRange;
  WarningStyle = WarningStyle;

ngOnInit() {
if (!!this.safetyStatus) {
this.reactorName = this.safetyStatus.extendedStatus?.name;
if (this.safetyStatus.statusCoreTemperature !== Status.inRange) {
this.typeOfError = 'Core temperature ';
this.warningType = this.safetyStatus.statusCoreTemperature;
} else {
this.typeOfError = 'Power production output ';
this.warningType = this.safetyStatus.statusPowerProduction;
}
} else if (!!this.reactorStatus) {
this.reactorName = this.reactorStatus.name;
if (this.reactorStatus?.status.coreTempStatus !== Status.inRange) {
this.typeOfError = 'Core temperature ';
this.warningType = this.reactorStatus.status.coreTempStatus;
} else {
this.typeOfError = 'Power production output ';
this.warningType = this.reactorStatus.status.powerProdStatus;
}}
}
goToReactor(event: Event) {
if (this.reactorStatus) {
event.preventDefault();
this.scrollToElement.emit(this.reactorStatus.id);
}}
}
</code>
<p class="hint">In welcome.component.html:</p>
<code>
&lt;div class="welcome__status__section"
        [ngClass]="{'welcome__status__section--full': data.safetyStatus.statusPowerProduction == Status.inRange &amp;&amp; data.safetyStatus.statusCoreTemperature == Status.inRange}"&gt;
        &lt;app-status class="welcome__status__section__status-container" [status]="data.safetyStatus"&gt;&lt;/app-status&gt;
        &lt;app-warning
          *ngIf="data.safetyStatus.statusPowerProduction !== Status.inRange || data.safetyStatus.statusCoreTemperature !== Status.inRange"
          [safetyStatus]="data.safetyStatus"&gt;&lt;/app-warning&gt;
      &lt;/div&gt;
</code>
<p class="hint">In welcome.component.scss :</p>
<code>
    &__section {
      display: grid;
      grid-template-columns: 1fr 1fr;
      width: 100%;
      column-gap: 0.5rem;
      &--full {
        grid-template-columns: 1fr;
        width: 65%;
      }
    }
</code>
</details>
</details>

## Safety system status - part 2 - Alert bar <span id="json-content-8"></span>
<details>
<summary>Expand details</summary>

### Description
As a user, I would like to know, if any of the reactors has exceeded the safety norms when I am located on a different page than HP, so that I do not miss important alert.


Temperature ranges:
x <250 - critical <br>
250 <= x < 400 - out of range <br>
400 <= x <800 - in range <br>
800<= x < 950 - out of range <br>
x >= 950 - critica <br>

Power production ranges:

x < 10 - critical <br>
10 <= x <50 - out of range <br>
50<= x <250 - in range <br>
250 <= x < 300 - out of range <br>
x >= 300 - critical <br>
#### Wireframe
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-6301&t=oeB0VM1YOR7OOK14-1
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-8523&m=dev

### Expected outcome
Correct warning from designs which user can see on each page of app.
### Tips
<details>
    <summary>Tip 1 </summary>
    <p class="hint">Search safe library dedicated for warnings in Angular apps</p>
</details>
<details>
    <summary>Code </summary>
<p class="hint">Add WarningStyle enum that will describe the type of styling for warning component</p>
<code>
export enum WarningStyle {
  standard = 'standard',
  notification = 'notification',
}
</code>
<p class="hint">Add warning notification style in warning.component.html</p>
<code>
&lt;div class="warning warning--{{warningType}} warning--{{warningStyle}}"&gt;
    &lt;div class="warning__icon-container"&gt;
        &lt;img class="warning__icon-container__icon" src="assets/icons/alert.svg"&gt;
    &lt;/div&gt;
    &lt;div class="warning__content"&gt; {{typeOfError}} of &lt;span class="warning__content__reactor-name"&gt;{{ reactorName
            }}&lt;/span&gt; has exeeded safe levels. Urgent attention
        required.
        &lt;br *ngIf="warningStyle == WarningStyle.standard"&gt;
        &lt;a href="reactors" class="warning__link" (click)="goToReactor($event)"&gt;See details&lt;/a&gt;
    &lt;/div&gt;
&lt;/div&gt;
</code>

<p class="hint">In warning.component.scss add notification class that styles component to look like a alert-bar</p>
<code>
@use"_variables" as *;

.warning {
display: flex;
flex-direction: row;
align-items: center;
height: 100%;
&__icon-container {
width: 7rem;
height: 7rem;
margin: 0 3rem;
align-content: center;
&__icon {
width: 3.8rem;
height: 3.8rem;
}
border-radius: 20rem;
}
&__content {
text-align: left;
}
}
.warning--critical.warning--notification {
background-color: $red;
color: $white;
.warning {
&__link {
color: $white;
}
&__icon-container__icon {
filter: brightness(0) invert(1);
}
}
}
.warning--out-of-range.warning--notification {
background-color: $sollor-yellow;
}
.warning--critical.warning--standard {
background-color: $light-red;
.warning__icon-container {
background-color: $red;
}
}
.warning--out-of-range.warning--standard {
background-color: $light-yellow;
.warning__icon-container {
background-color: $sollor-yellow;
}
}
.warning--notification {
padding: 0.5rem 1rem;
width: 80vw;
margin-bottom: 0.5rem;
.warning {
&__icon-container {
width: 5rem;
height: 5rem;
margin: 0 0.5rem;
}
&__content {
width: 100%;
&__reactor-name {
font-weight: 700;
}
}
}
}
</code>
<p class="hint">Add app-warning component with notification Style in reactor-list-page.component.html</p>
<code>
  &lt;ng-container *ngFor="let reactor of reactors"&gt;
    &lt;app-warning
      *ngIf="reactor.status.coreTempStatus !== Status.inRange || reactor.status.powerProdStatus !== Status.inRange"
      [warningStyle]="WarningStyle.notification" [reactorStatus]="reactor"
      (scrollToElement)="scrollToReactor(reactor.id)"&gt;&lt;/app-warning&gt;
  &lt;/ng-container&gt;
</code>
</details>

</details>

## Safety system status - part 3 - Charts <span id="json-content-9"></span>
<details>
<summary>Expand details</summary>

### Description
As a user, I would like to be notified when each reactor's temperature OR power production exceeds safety limit, so that I can potentially plan an escape. Such information should be visible under each chart as current status of each reactor. 


Ranges stays the same for core temp:

x <250 - critical <br>
250 <= x < 400 - out of range <br>
400 <= x <800 - in range <br>
800<= x < 950 - out of range <br>
x >= 950 - critical <br>

Power production ranges:

x < 10 - critical <br>
10 <= x <50 - out of range <br>
50<= x <250 - in range <br>
250 <= x < 300 - out of range <br>
x >= 300 - critical

#### Wireframe
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-5596&m=dev
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-8533&m=dev

### Expected outcome
Correct warning from designs which user can see on each page of app.
### Tips
<details>
    <summary>Tip 1 </summary>
    <p class="hint">Learn how to show different warinings in the same time</p>
</details>

<details>
    <summary>Tip 2 </summary>
    <p class="hint">Answer </p>
</details>
<details>
<summary>Code</summary>
<p class="hint">Create new component called "chart-status" that will be displayed in chart components.</p>
<code>
&lt;div class="chart-status"&gt;
  &lt;div class="chart-status__container"&gt;
    &lt;div&gt;{{title}}: &lt;/div&gt;
    &lt;div class="chart-status__container__status"&gt;
      &lt;ng-container [ngSwitch]="status"&gt;
        &lt;ng-container *ngSwitchCase="statuses.inRange"&gt;In range &lt;div class="chart-status__dot chart-status__dot--green"&gt;
          &lt;/div&gt;&lt;/ng-container&gt;
        &lt;ng-container *ngSwitchCase="statuses.outOfRange"&gt;Out of range &lt;div
            class="chart-status__dot chart-status__dot--yellow"&gt;&lt;/div&gt;&lt;/ng-container&gt;
        &lt;ng-container *ngSwitchCase="statuses.critical"&gt;Critically out of range &lt;div
            class="chart-status__dot chart-status__dot--red"&gt;&lt;/div&gt;&lt;/ng-container&gt;
      &lt;/ng-container&gt;
    &lt;/div&gt;
  &lt;/div&gt;
&lt;/div&gt;
</code>
<p class="hint">In chart-status.component.html</p>
<code>
export class ChartStatusComponent {
  @Input() title!: string;
  @Input() status!: Status;
  statuses = Status;
}
</code>
<p class="hint">In chart-status.component.ts</p>
<code>
@use "_variables" as *;
.chart-status {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &__container {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    &__status {
      display: flex;
      flex-direction: row;
      align-items: center;
      &__dot {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;
        margin-left: 0.5rem;
        &--green {
          background-color: $green;
        }
        &--yellow {
          background-color: $sollor-yellow;
        }
        &--red {
          background-color: $red;
        }
      }
    }
  }
}
</code>
<p class="hint">In chart-status.component.scss</p>
<code>
&lt;app-chart-status [status]="reactorStatus" [title]="'Power production status'"&gt;&lt;/app-chart-status&gt;
</code>
<p class="hint">In power-production-chart.component.html</p>
<code>
&lt;app-chart-status [status]="reactorStatus" [title]="'Core temperature status'"&gt;&lt;/app-chart-status&gt;
</code>
<p class="hint">In core-temperature-chart.component.html</p>
</details>
</details>

<br>
<br>

<h1> Additional tasks with star*<h1>

## Our locations interactive marks*</span>

<details>
<summary>Expand details</summary>

### Description
As a user, I would like to see a map, that shows location of our 3 reactors, on our Home Page, so I can quickly get to know where they are located.
#### Wireframe
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2004-1117&t=nUM1QRaiXRkL535s-0

### Expected outcome
I want to have clickable mark on map image that I can click on to see deatials of reactor. 

### Tips
<details>
    <summary>Tip 1 </summary>
    <p class="hint">Ask UX for new image, mock it, later on you can add loading it form API or replace image in the BE</p>
</details>

<details>
    <summary>Tip 2 </summary>
    <p class="hint">Create clickable component that will act as mark on the map and place it on correct spot. How? If image size is fixed you can calculate exact spot in [x,y] axis to place marks. </p>
</details>
</details>

## Our locations - interactive marks with warnings**</span>

<details>
<summary>Expand details</summary>

### Description
As a user, I would like to see a map, that shows location of our 3 reactors, on our Home Page, so I can quickly get to know where they are located. Also If there is something wrong with reactor I would like marker to show that.

#### Wireframe
https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2154-2239&t=innDFK99WTdCKmxk-1

### Expected outcome
I want to have clickable mark on map image that I can click on to see deatials of reactor. 

### Tips
<details>
    <summary>Tip 1 </summary>
    <p class="hint">Ask UX for new image, mock it, later on you can add loading it form API or replace image in the BE</p>
</details>

<details>
    <summary>Tip 2 </summary>
    <p class="hint">Create clickable component that will act as mark on the map and place it on correct spot. How? If image size is fixed you can calculate exact spot in [x,y] axis to place marks. </p>
</details>
</details>

## Our locations - additional details for reactors***</span>

<details>
<summary>Expand details</summary>

### Description
As a user, I would like to see a map, that shows location of our 3 reactors, on our Home Page, so I can quickly get to know where they are located. I also would like to se quick summary of reactor details such as:
- name
- location (long and lang)
- avarage production output
- status of reactor (green - ok, yellow - warning, red- critical)

#### Wireframe

https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2150-1929&t=r2qTmt6jnnfGNXDJ-1

### Expected outcome
After marker is clicked side panel opens up with details of reactor. 

### Tips
<details>
    <summary>Tip 1 </summary>
    <p class="hint">Ask UX for new design, discuss how it can look like</p>
</details>

<details>
    <summary>Tip 2 </summary>
    <p class="hint">Ask PO for reactor details data or mock them. You can add more realistic data later on during update of BE</p>
</details>

</details>

## Our locations - interactive map****</span>

<details>
<summary>Expand details</summary>

### Description
As a user, I would like to see a interactive map, that shows location of our 3 reactors, on our Home Page, so I can quickly get to know where they are located. I want to zoom in and out on map to see detailed location of reactor. 
#### Wireframe

https://www.figma.com/design/D09gXGjycBxsrXo1GwxsPO/Letnie-praktyki?node-id=2150-1929&t=r2qTmt6jnnfGNXDJ-1

### Expected outcome
I want to have integration with opensource map system to display map on which I will see clickable marks. I can see details of location on the side of the map after clicking the mark.

### Tips
<details>
    <summary>Tip 1 </summary>
    <p class="hint">Ask UX for new design, discuss how it can look like</p>
</details>

<details>
    <summary>Tip 2 </summary>
    <p class="hint">Ask PO for reactor details data or mock them. You can add more realistic data later on during update of BE</p>
</details>

<details>
    <summary>Tip 3 </summary>
    <p class="hint">Integrate with Open Street Maps or similar open source solution. Use custom marker. </p>
</details>
</details>

## Check accessibility*</span>

<details>
<summary>Expand details</summary>

### Description
Business is expecting app to meet WCAG standards. 

### Expected outcome
App is meeting WCAG standards or there is a list of elements that requires correction.

### Tips

<details>
    <summary>Tip 1 </summary>
    <p class="hint">Wave Evaluation Tool can help you</p>
</details>
<details>
    <summary>Tip 2 </summary>
    <p class="hint">I don't like red</p>
</details>
</details>

## Correct accessibility**</span>

<details>
<summary>Expand details</summary>

### Description
There was accessibility audit on the app. Auditor provided us with list vof things that need to be corrected.

### Expected outcome
App is meeting WCAG standards.

### Tips

<details>
    <summary>Tip 1 </summary>
    <p class="hint">You were the auditor in previous task :)</p>
</details>
</details>
