/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { AnimationBuilder } from '@angular/animations';
import { AnimationDriver, ɵAnimationEngine as AnimationEngine, ɵAnimationStyleNormalizer as AnimationStyleNormalizer, ɵCssKeyframesDriver as CssKeyframesDriver, ɵNoopAnimationDriver as NoopAnimationDriver, ɵsupportsWebAnimations as supportsWebAnimations, ɵWebAnimationsDriver as WebAnimationsDriver, ɵWebAnimationsStyleNormalizer as WebAnimationsStyleNormalizer } from '@angular/animations/browser';
import { DOCUMENT } from '@angular/common';
import { Inject, Injectable, InjectionToken, NgZone, RendererFactory2 } from '@angular/core';
import { ɵDomRendererFactory2 as DomRendererFactory2 } from '@angular/platform-browser';
import { BrowserAnimationBuilder } from './animation_builder';
import { AnimationRendererFactory } from './animation_renderer';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations/browser";
export class InjectableAnimationEngine extends AnimationEngine {
    constructor(doc, driver, normalizer) {
        super(doc.body, driver, normalizer);
    }
    ngOnDestroy() {
        this.flush();
    }
}
InjectableAnimationEngine.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: InjectableAnimationEngine, deps: [{ token: DOCUMENT }, { token: i1.AnimationDriver }, { token: i1.ɵAnimationStyleNormalizer }], target: i0.ɵɵFactoryTarget.Injectable });
InjectableAnimationEngine.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: InjectableAnimationEngine });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.3", ngImport: i0, type: InjectableAnimationEngine, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [DOCUMENT]
                }] }, { type: i1.AnimationDriver }, { type: i1.ɵAnimationStyleNormalizer }]; } });
export function instantiateSupportedAnimationDriver() {
    return supportsWebAnimations() ? new WebAnimationsDriver() : new CssKeyframesDriver();
}
export function instantiateDefaultStyleNormalizer() {
    return new WebAnimationsStyleNormalizer();
}
export function instantiateRendererFactory(renderer, engine, zone) {
    return new AnimationRendererFactory(renderer, engine, zone);
}
/**
 * @publicApi
 */
export const ANIMATION_MODULE_TYPE = new InjectionToken('AnimationModuleType');
const SHARED_ANIMATION_PROVIDERS = [
    { provide: AnimationBuilder, useClass: BrowserAnimationBuilder },
    { provide: AnimationStyleNormalizer, useFactory: instantiateDefaultStyleNormalizer },
    { provide: AnimationEngine, useClass: InjectableAnimationEngine }, {
        provide: RendererFactory2,
        useFactory: instantiateRendererFactory,
        deps: [DomRendererFactory2, AnimationEngine, NgZone]
    }
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserModule.
 */
export const BROWSER_ANIMATIONS_PROVIDERS = [
    { provide: AnimationDriver, useFactory: instantiateSupportedAnimationDriver },
    { provide: ANIMATION_MODULE_TYPE, useValue: 'BrowserAnimations' }, ...SHARED_ANIMATION_PROVIDERS
];
/**
 * Separate providers from the actual module so that we can do a local modification in Google3 to
 * include them in the BrowserTestingModule.
 */
export const BROWSER_NOOP_ANIMATIONS_PROVIDERS = [
    { provide: AnimationDriver, useClass: NoopAnimationDriver },
    { provide: ANIMATION_MODULE_TYPE, useValue: 'NoopAnimations' }, ...SHARED_ANIMATION_PROVIDERS
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvcGxhdGZvcm0tYnJvd3Nlci9hbmltYXRpb25zL3NyYy9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7OztHQU1HO0FBRUgsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDckQsT0FBTyxFQUFDLGVBQWUsRUFBRSxnQkFBZ0IsSUFBSSxlQUFlLEVBQUUseUJBQXlCLElBQUksd0JBQXdCLEVBQUUsbUJBQW1CLElBQUksa0JBQWtCLEVBQUUsb0JBQW9CLElBQUksbUJBQW1CLEVBQUUsc0JBQXNCLElBQUkscUJBQXFCLEVBQUUsb0JBQW9CLElBQUksbUJBQW1CLEVBQUUsNkJBQTZCLElBQUksNEJBQTRCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUM3WSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDekMsT0FBTyxFQUFDLE1BQU0sRUFBRSxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sRUFBdUIsZ0JBQWdCLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDaEgsT0FBTyxFQUFDLG9CQUFvQixJQUFJLG1CQUFtQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFFdEYsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0scUJBQXFCLENBQUM7QUFDNUQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sc0JBQXNCLENBQUM7OztBQUc5RCxNQUFNLE9BQU8seUJBQTBCLFNBQVEsZUFBZTtJQUM1RCxZQUNzQixHQUFRLEVBQUUsTUFBdUIsRUFBRSxVQUFvQztRQUMzRixLQUFLLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxNQUFNLEVBQUUsVUFBVSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELFdBQVc7UUFDVCxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7SUFDZixDQUFDOztpSUFSVSx5QkFBeUIsa0JBRXhCLFFBQVE7cUlBRlQseUJBQXlCO3NHQUF6Qix5QkFBeUI7a0JBRHJDLFVBQVU7OzBCQUdKLE1BQU07MkJBQUMsUUFBUTs7QUFTdEIsTUFBTSxVQUFVLG1DQUFtQztJQUNqRCxPQUFPLHFCQUFxQixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksbUJBQW1CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxrQkFBa0IsRUFBRSxDQUFDO0FBQ3hGLENBQUM7QUFFRCxNQUFNLFVBQVUsaUNBQWlDO0lBQy9DLE9BQU8sSUFBSSw0QkFBNEIsRUFBRSxDQUFDO0FBQzVDLENBQUM7QUFFRCxNQUFNLFVBQVUsMEJBQTBCLENBQ3RDLFFBQTZCLEVBQUUsTUFBdUIsRUFBRSxJQUFZO0lBQ3RFLE9BQU8sSUFBSSx3QkFBd0IsQ0FBQyxRQUFRLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQzlELENBQUM7QUFFRDs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUM5QixJQUFJLGNBQWMsQ0FBdUMscUJBQXFCLENBQUMsQ0FBQztBQUVwRixNQUFNLDBCQUEwQixHQUFlO0lBQzdDLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSx1QkFBdUIsRUFBQztJQUM5RCxFQUFDLE9BQU8sRUFBRSx3QkFBd0IsRUFBRSxVQUFVLEVBQUUsaUNBQWlDLEVBQUM7SUFDbEYsRUFBQyxPQUFPLEVBQUUsZUFBZSxFQUFFLFFBQVEsRUFBRSx5QkFBeUIsRUFBQyxFQUFFO1FBQy9ELE9BQU8sRUFBRSxnQkFBZ0I7UUFDekIsVUFBVSxFQUFFLDBCQUEwQjtRQUN0QyxJQUFJLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxlQUFlLEVBQUUsTUFBTSxDQUFDO0tBQ3JEO0NBQ0YsQ0FBQztBQUVGOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLDRCQUE0QixHQUFlO0lBQ3RELEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsbUNBQW1DLEVBQUM7SUFDM0UsRUFBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFDLEVBQUUsR0FBRywwQkFBMEI7Q0FDL0YsQ0FBQztBQUVGOzs7R0FHRztBQUNILE1BQU0sQ0FBQyxNQUFNLGlDQUFpQyxHQUFlO0lBQzNELEVBQUMsT0FBTyxFQUFFLGVBQWUsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLEVBQUM7SUFDekQsRUFBQyxPQUFPLEVBQUUscUJBQXFCLEVBQUUsUUFBUSxFQUFFLGdCQUFnQixFQUFDLEVBQUUsR0FBRywwQkFBMEI7Q0FDNUYsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCBHb29nbGUgTExDIEFsbCBSaWdodHMgUmVzZXJ2ZWQuXG4gKlxuICogVXNlIG9mIHRoaXMgc291cmNlIGNvZGUgaXMgZ292ZXJuZWQgYnkgYW4gTUlULXN0eWxlIGxpY2Vuc2UgdGhhdCBjYW4gYmVcbiAqIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgYXQgaHR0cHM6Ly9hbmd1bGFyLmlvL2xpY2Vuc2VcbiAqL1xuXG5pbXBvcnQge0FuaW1hdGlvbkJ1aWxkZXJ9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtBbmltYXRpb25Ecml2ZXIsIMm1QW5pbWF0aW9uRW5naW5lIGFzIEFuaW1hdGlvbkVuZ2luZSwgybVBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIgYXMgQW5pbWF0aW9uU3R5bGVOb3JtYWxpemVyLCDJtUNzc0tleWZyYW1lc0RyaXZlciBhcyBDc3NLZXlmcmFtZXNEcml2ZXIsIMm1Tm9vcEFuaW1hdGlvbkRyaXZlciBhcyBOb29wQW5pbWF0aW9uRHJpdmVyLCDJtXN1cHBvcnRzV2ViQW5pbWF0aW9ucyBhcyBzdXBwb3J0c1dlYkFuaW1hdGlvbnMsIMm1V2ViQW5pbWF0aW9uc0RyaXZlciBhcyBXZWJBbmltYXRpb25zRHJpdmVyLCDJtVdlYkFuaW1hdGlvbnNTdHlsZU5vcm1hbGl6ZXIgYXMgV2ViQW5pbWF0aW9uc1N0eWxlTm9ybWFsaXplcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucy9icm93c2VyJztcbmltcG9ydCB7RE9DVU1FTlR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQge0luamVjdCwgSW5qZWN0YWJsZSwgSW5qZWN0aW9uVG9rZW4sIE5nWm9uZSwgT25EZXN0cm95LCBQcm92aWRlciwgUmVuZGVyZXJGYWN0b3J5Mn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge8m1RG9tUmVuZGVyZXJGYWN0b3J5MiBhcyBEb21SZW5kZXJlckZhY3RvcnkyfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcblxuaW1wb3J0IHtCcm93c2VyQW5pbWF0aW9uQnVpbGRlcn0gZnJvbSAnLi9hbmltYXRpb25fYnVpbGRlcic7XG5pbXBvcnQge0FuaW1hdGlvblJlbmRlcmVyRmFjdG9yeX0gZnJvbSAnLi9hbmltYXRpb25fcmVuZGVyZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW5qZWN0YWJsZUFuaW1hdGlvbkVuZ2luZSBleHRlbmRzIEFuaW1hdGlvbkVuZ2luZSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgQEluamVjdChET0NVTUVOVCkgZG9jOiBhbnksIGRyaXZlcjogQW5pbWF0aW9uRHJpdmVyLCBub3JtYWxpemVyOiBBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIpIHtcbiAgICBzdXBlcihkb2MuYm9keSwgZHJpdmVyLCBub3JtYWxpemVyKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuZmx1c2goKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGVTdXBwb3J0ZWRBbmltYXRpb25Ecml2ZXIoKSB7XG4gIHJldHVybiBzdXBwb3J0c1dlYkFuaW1hdGlvbnMoKSA/IG5ldyBXZWJBbmltYXRpb25zRHJpdmVyKCkgOiBuZXcgQ3NzS2V5ZnJhbWVzRHJpdmVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpbnN0YW50aWF0ZURlZmF1bHRTdHlsZU5vcm1hbGl6ZXIoKSB7XG4gIHJldHVybiBuZXcgV2ViQW5pbWF0aW9uc1N0eWxlTm9ybWFsaXplcigpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaW5zdGFudGlhdGVSZW5kZXJlckZhY3RvcnkoXG4gICAgcmVuZGVyZXI6IERvbVJlbmRlcmVyRmFjdG9yeTIsIGVuZ2luZTogQW5pbWF0aW9uRW5naW5lLCB6b25lOiBOZ1pvbmUpIHtcbiAgcmV0dXJuIG5ldyBBbmltYXRpb25SZW5kZXJlckZhY3RvcnkocmVuZGVyZXIsIGVuZ2luZSwgem9uZSk7XG59XG5cbi8qKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgY29uc3QgQU5JTUFUSU9OX01PRFVMRV9UWVBFID1cbiAgICBuZXcgSW5qZWN0aW9uVG9rZW48J05vb3BBbmltYXRpb25zJ3wnQnJvd3NlckFuaW1hdGlvbnMnPignQW5pbWF0aW9uTW9kdWxlVHlwZScpO1xuXG5jb25zdCBTSEFSRURfQU5JTUFUSU9OX1BST1ZJREVSUzogUHJvdmlkZXJbXSA9IFtcbiAge3Byb3ZpZGU6IEFuaW1hdGlvbkJ1aWxkZXIsIHVzZUNsYXNzOiBCcm93c2VyQW5pbWF0aW9uQnVpbGRlcn0sXG4gIHtwcm92aWRlOiBBbmltYXRpb25TdHlsZU5vcm1hbGl6ZXIsIHVzZUZhY3Rvcnk6IGluc3RhbnRpYXRlRGVmYXVsdFN0eWxlTm9ybWFsaXplcn0sXG4gIHtwcm92aWRlOiBBbmltYXRpb25FbmdpbmUsIHVzZUNsYXNzOiBJbmplY3RhYmxlQW5pbWF0aW9uRW5naW5lfSwge1xuICAgIHByb3ZpZGU6IFJlbmRlcmVyRmFjdG9yeTIsXG4gICAgdXNlRmFjdG9yeTogaW5zdGFudGlhdGVSZW5kZXJlckZhY3RvcnksXG4gICAgZGVwczogW0RvbVJlbmRlcmVyRmFjdG9yeTIsIEFuaW1hdGlvbkVuZ2luZSwgTmdab25lXVxuICB9XG5dO1xuXG4vKipcbiAqIFNlcGFyYXRlIHByb3ZpZGVycyBmcm9tIHRoZSBhY3R1YWwgbW9kdWxlIHNvIHRoYXQgd2UgY2FuIGRvIGEgbG9jYWwgbW9kaWZpY2F0aW9uIGluIEdvb2dsZTMgdG9cbiAqIGluY2x1ZGUgdGhlbSBpbiB0aGUgQnJvd3Nlck1vZHVsZS5cbiAqL1xuZXhwb3J0IGNvbnN0IEJST1dTRVJfQU5JTUFUSU9OU19QUk9WSURFUlM6IFByb3ZpZGVyW10gPSBbXG4gIHtwcm92aWRlOiBBbmltYXRpb25Ecml2ZXIsIHVzZUZhY3Rvcnk6IGluc3RhbnRpYXRlU3VwcG9ydGVkQW5pbWF0aW9uRHJpdmVyfSxcbiAge3Byb3ZpZGU6IEFOSU1BVElPTl9NT0RVTEVfVFlQRSwgdXNlVmFsdWU6ICdCcm93c2VyQW5pbWF0aW9ucyd9LCAuLi5TSEFSRURfQU5JTUFUSU9OX1BST1ZJREVSU1xuXTtcblxuLyoqXG4gKiBTZXBhcmF0ZSBwcm92aWRlcnMgZnJvbSB0aGUgYWN0dWFsIG1vZHVsZSBzbyB0aGF0IHdlIGNhbiBkbyBhIGxvY2FsIG1vZGlmaWNhdGlvbiBpbiBHb29nbGUzIHRvXG4gKiBpbmNsdWRlIHRoZW0gaW4gdGhlIEJyb3dzZXJUZXN0aW5nTW9kdWxlLlxuICovXG5leHBvcnQgY29uc3QgQlJPV1NFUl9OT09QX0FOSU1BVElPTlNfUFJPVklERVJTOiBQcm92aWRlcltdID0gW1xuICB7cHJvdmlkZTogQW5pbWF0aW9uRHJpdmVyLCB1c2VDbGFzczogTm9vcEFuaW1hdGlvbkRyaXZlcn0sXG4gIHtwcm92aWRlOiBBTklNQVRJT05fTU9EVUxFX1RZUEUsIHVzZVZhbHVlOiAnTm9vcEFuaW1hdGlvbnMnfSwgLi4uU0hBUkVEX0FOSU1BVElPTl9QUk9WSURFUlNcbl07XG4iXX0=