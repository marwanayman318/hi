/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
/**
 * Specifies automatic styling.
 *
 * @publicApi
 */
export const AUTO_STYLE = '*';
/**
 * Creates a named animation trigger, containing a  list of `state()`
 * and `transition()` entries to be evaluated when the expression
 * bound to the trigger changes.
 *
 * @param name An identifying string.
 * @param definitions  An animation definition object, containing an array of `state()`
 * and `transition()` declarations.
 *
 * @return An object that encapsulates the trigger data.
 *
 * @usageNotes
 * Define an animation trigger in the `animations` section of `@Component` metadata.
 * In the template, reference the trigger by name and bind it to a trigger expression that
 * evaluates to a defined animation state, using the following format:
 *
 * `[@triggerName]="expression"`
 *
 * Animation trigger bindings convert all values to strings, and then match the
 * previous and current values against any linked transitions.
 * Booleans can be specified as `1` or `true` and `0` or `false`.
 *
 * ### Usage Example
 *
 * The following example creates an animation trigger reference based on the provided
 * name value.
 * The provided animation value is expected to be an array consisting of state and
 * transition declarations.
 *
 * ```typescript
 * @Component({
 *   selector: "my-component",
 *   templateUrl: "my-component-tpl.html",
 *   animations: [
 *     trigger("myAnimationTrigger", [
 *       state(...),
 *       state(...),
 *       transition(...),
 *       transition(...)
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   myStatusExp = "something";
 * }
 * ```
 *
 * The template associated with this component makes use of the defined trigger
 * by binding to an element within its template code.
 *
 * ```html
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * ### Using an inline function
 * The `transition` animation method also supports reading an inline function which can decide
 * if its associated animation should be run.
 *
 * ```typescript
 * // this method is run each time the `myAnimationTrigger` trigger value changes.
 * function myInlineMatcherFn(fromState: string, toState: string, element: any, params: {[key:
 string]: any}): boolean {
 *   // notice that `element` and `params` are also available here
 *   return toState == 'yes-please-animate';
 * }
 *
 * @Component({
 *   selector: 'my-component',
 *   templateUrl: 'my-component-tpl.html',
 *   animations: [
 *     trigger('myAnimationTrigger', [
 *       transition(myInlineMatcherFn, [
 *         // the animation sequence code
 *       ]),
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   myStatusExp = "yes-please-animate";
 * }
 * ```
 *
 * ### Disabling Animations
 * When true, the special animation control binding `@.disabled` binding prevents
 * all animations from rendering.
 * Place the  `@.disabled` binding on an element to disable
 * animations on the element itself, as well as any inner animation triggers
 * within the element.
 *
 * The following example shows how to use this feature:
 *
 * ```typescript
 * @Component({
 *   selector: 'my-component',
 *   template: `
 *     <div [@.disabled]="isDisabled">
 *       <div [@childAnimation]="exp"></div>
 *     </div>
 *   `,
 *   animations: [
 *     trigger("childAnimation", [
 *       // ...
 *     ])
 *   ]
 * })
 * class MyComponent {
 *   isDisabled = true;
 *   exp = '...';
 * }
 * ```
 *
 * When `@.disabled` is true, it prevents the `@childAnimation` trigger from animating,
 * along with any inner animations.
 *
 * ### Disable animations application-wide
 * When an area of the template is set to have animations disabled,
 * **all** inner components have their animations disabled as well.
 * This means that you can disable all animations for an app
 * by placing a host binding set on `@.disabled` on the topmost Angular component.
 *
 * ```typescript
 * import {Component, HostBinding} from '@angular/core';
 *
 * @Component({
 *   selector: 'app-component',
 *   templateUrl: 'app.component.html',
 * })
 * class AppComponent {
 *   @HostBinding('@.disabled')
 *   public animationsDisabled = true;
 * }
 * ```
 *
 * ### Overriding disablement of inner animations
 * Despite inner animations being disabled, a parent animation can `query()`
 * for inner elements located in disabled areas of the template and still animate
 * them if needed. This is also the case for when a sub animation is
 * queried by a parent and then later animated using `animateChild()`.
 *
 * ### Detecting when an animation is disabled
 * If a region of the DOM (or the entire application) has its animations disabled, the animation
 * trigger callbacks still fire, but for zero seconds. When the callback fires, it provides
 * an instance of an `AnimationEvent`. If animations are disabled,
 * the `.disabled` flag on the event is true.
 *
 * @publicApi
 */
export function trigger(name, definitions) {
    return { type: 7 /* Trigger */, name, definitions, options: {} };
}
/**
 * Defines an animation step that combines styling information with timing information.
 *
 * @param timings Sets `AnimateTimings` for the parent animation.
 * A string in the format "duration [delay] [easing]".
 *  - Duration and delay are expressed as a number and optional time unit,
 * such as "1s" or "10ms" for one second and 10 milliseconds, respectively.
 * The default unit is milliseconds.
 *  - The easing value controls how the animation accelerates and decelerates
 * during its runtime. Value is one of  `ease`, `ease-in`, `ease-out`,
 * `ease-in-out`, or a `cubic-bezier()` function call.
 * If not supplied, no easing is applied.
 *
 * For example, the string "1s 100ms ease-out" specifies a duration of
 * 1000 milliseconds, and delay of 100 ms, and the "ease-out" easing style,
 * which decelerates near the end of the duration.
 * @param styles Sets AnimationStyles for the parent animation.
 * A function call to either `style()` or `keyframes()`
 * that returns a collection of CSS style entries to be applied to the parent animation.
 * When null, uses the styles from the destination state.
 * This is useful when describing an animation step that will complete an animation;
 * see "Animating to the final state" in `transitions()`.
 * @returns An object that encapsulates the animation step.
 *
 * @usageNotes
 * Call within an animation `sequence()`, `{@link animations/group group()}`, or
 * `transition()` call to specify an animation step
 * that applies given style data to the parent animation for a given amount of time.
 *
 * ### Syntax Examples
 * **Timing examples**
 *
 * The following examples show various `timings` specifications.
 * - `animate(500)` : Duration is 500 milliseconds.
 * - `animate("1s")` : Duration is 1000 milliseconds.
 * - `animate("100ms 0.5s")` : Duration is 100 milliseconds, delay is 500 milliseconds.
 * - `animate("5s ease-in")` : Duration is 5000 milliseconds, easing in.
 * - `animate("5s 10ms cubic-bezier(.17,.67,.88,.1)")` : Duration is 5000 milliseconds, delay is 10
 * milliseconds, easing according to a bezier curve.
 *
 * **Style examples**
 *
 * The following example calls `style()` to set a single CSS style.
 * ```typescript
 * animate(500, style({ background: "red" }))
 * ```
 * The following example calls `keyframes()` to set a CSS style
 * to different values for successive keyframes.
 * ```typescript
 * animate(500, keyframes(
 *  [
 *   style({ background: "blue" }),
 *   style({ background: "red" })
 *  ])
 * ```
 *
 * @publicApi
 */
export function animate(timings, styles = null) {
    return { type: 4 /* Animate */, styles, timings };
}
/**
 * @description Defines a list of animation steps to be run in parallel.
 *
 * @param steps An array of animation step objects.
 * - When steps are defined by `style()` or `animate()`
 * function calls, each call within the group is executed instantly.
 * - To specify offset styles to be applied at a later time, define steps with
 * `keyframes()`, or use `animate()` calls with a delay value.
 * For example:
 *
 * ```typescript
 * group([
 *   animate("1s", style({ background: "black" })),
 *   animate("2s", style({ color: "white" }))
 * ])
 * ```
 *
 * @param options An options object containing a delay and
 * developer-defined parameters that provide styling defaults and
 * can be overridden on invocation.
 *
 * @return An object that encapsulates the group data.
 *
 * @usageNotes
 * Grouped animations are useful when a series of styles must be
 * animated at different starting times and closed off at different ending times.
 *
 * When called within a `sequence()` or a
 * `transition()` call, does not continue to the next
 * instruction until all of the inner animation steps have completed.
 *
 * @publicApi
 */
export function group(steps, options = null) {
    return { type: 3 /* Group */, steps, options };
}
/**
 * Defines a list of animation steps to be run sequentially, one by one.
 *
 * @param steps An array of animation step objects.
 * - Steps defined by `style()` calls apply the styling data immediately.
 * - Steps defined by `animate()` calls apply the styling data over time
 *   as specified by the timing data.
 *
 * ```typescript
 * sequence([
 *   style({ opacity: 0 }),
 *   animate("1s", style({ opacity: 1 }))
 * ])
 * ```
 *
 * @param options An options object containing a delay and
 * developer-defined parameters that provide styling defaults and
 * can be overridden on invocation.
 *
 * @return An object that encapsulates the sequence data.
 *
 * @usageNotes
 * When you pass an array of steps to a
 * `transition()` call, the steps run sequentially by default.
 * Compare this to the `{@link animations/group group()}` call, which runs animation steps in
 *parallel.
 *
 * When a sequence is used within a `{@link animations/group group()}` or a `transition()` call,
 * execution continues to the next instruction only after each of the inner animation
 * steps have completed.
 *
 * @publicApi
 **/
export function sequence(steps, options = null) {
    return { type: 2 /* Sequence */, steps, options };
}
/**
 * Declares a key/value object containing CSS properties/styles that
 * can then be used for an animation `state`, within an animation `sequence`,
 * or as styling data for calls to `animate()` and `keyframes()`.
 *
 * @param tokens A set of CSS styles or HTML styles associated with an animation state.
 * The value can be any of the following:
 * - A key-value style pair associating a CSS property with a value.
 * - An array of key-value style pairs.
 * - An asterisk (*), to use auto-styling, where styles are derived from the element
 * being animated and applied to the animation when it starts.
 *
 * Auto-styling can be used to define a state that depends on layout or other
 * environmental factors.
 *
 * @return An object that encapsulates the style data.
 *
 * @usageNotes
 * The following examples create animation styles that collect a set of
 * CSS property values:
 *
 * ```typescript
 * // string values for CSS properties
 * style({ background: "red", color: "blue" })
 *
 * // numerical pixel values
 * style({ width: 100, height: 0 })
 * ```
 *
 * The following example uses auto-styling to allow an element to animate from
 * a height of 0 up to its full height:
 *
 * ```
 * style({ height: 0 }),
 * animate("1s", style({ height: "*" }))
 * ```
 *
 * @publicApi
 **/
export function style(tokens) {
    return { type: 6 /* Style */, styles: tokens, offset: null };
}
/**
 * Declares an animation state within a trigger attached to an element.
 *
 * @param name One or more names for the defined state in a comma-separated string.
 * The following reserved state names can be supplied to define a style for specific use
 * cases:
 *
 * - `void` You can associate styles with this name to be used when
 * the element is detached from the application. For example, when an `ngIf` evaluates
 * to false, the state of the associated element is void.
 *  - `*` (asterisk) Indicates the default state. You can associate styles with this name
 * to be used as the fallback when the state that is being animated is not declared
 * within the trigger.
 *
 * @param styles A set of CSS styles associated with this state, created using the
 * `style()` function.
 * This set of styles persists on the element once the state has been reached.
 * @param options Parameters that can be passed to the state when it is invoked.
 * 0 or more key-value pairs.
 * @return An object that encapsulates the new state data.
 *
 * @usageNotes
 * Use the `trigger()` function to register states to an animation trigger.
 * Use the `transition()` function to animate between states.
 * When a state is active within a component, its associated styles persist on the element,
 * even when the animation ends.
 *
 * @publicApi
 **/
export function state(name, styles, options) {
    return { type: 0 /* State */, name, styles, options };
}
/**
 * Defines a set of animation styles, associating each style with an optional `offset` value.
 *
 * @param steps A set of animation styles with optional offset data.
 * The optional `offset` value for a style specifies a percentage of the total animation
 * time at which that style is applied.
 * @returns An object that encapsulates the keyframes data.
 *
 * @usageNotes
 * Use with the `animate()` call. Instead of applying animations
 * from the current state
 * to the destination state, keyframes describe how each style entry is applied and at what point
 * within the animation arc.
 * Compare [CSS Keyframe Animations](https://www.w3schools.com/css/css3_animations.asp).
 *
 * ### Usage
 *
 * In the following example, the offset values describe
 * when each `backgroundColor` value is applied. The color is red at the start, and changes to
 * blue when 20% of the total time has elapsed.
 *
 * ```typescript
 * // the provided offset values
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red", offset: 0 }),
 *   style({ backgroundColor: "blue", offset: 0.2 }),
 *   style({ backgroundColor: "orange", offset: 0.3 }),
 *   style({ backgroundColor: "black", offset: 1 })
 * ]))
 * ```
 *
 * If there are no `offset` values specified in the style entries, the offsets
 * are calculated automatically.
 *
 * ```typescript
 * animate("5s", keyframes([
 *   style({ backgroundColor: "red" }) // offset = 0
 *   style({ backgroundColor: "blue" }) // offset = 0.33
 *   style({ backgroundColor: "orange" }) // offset = 0.66
 *   style({ backgroundColor: "black" }) // offset = 1
 * ]))
 *```

 * @publicApi
 */
export function keyframes(steps) {
    return { type: 5 /* Keyframes */, steps };
}
/**
 * Declares an animation transition as a sequence of animation steps to run when a given
 * condition is satisfied. The condition is a Boolean expression or function that compares
 * the previous and current animation states, and returns true if this transition should occur.
 * When the state criteria of a defined transition are met, the associated animation is
 * triggered.
 *
 * @param stateChangeExpr A Boolean expression or function that compares the previous and current
 * animation states, and returns true if this transition should occur. Note that  "true" and "false"
 * match 1 and 0, respectively. An expression is evaluated each time a state change occurs in the
 * animation trigger element.
 * The animation steps run when the expression evaluates to true.
 *
 * - A state-change string takes the form "state1 => state2", where each side is a defined animation
 * state, or an asterisk (*) to refer to a dynamic start or end state.
 *   - The expression string can contain multiple comma-separated statements;
 * for example "state1 => state2, state3 => state4".
 *   - Special values `:enter` and `:leave` initiate a transition on the entry and exit states,
 * equivalent to  "void => *"  and "* => void".
 *   - Special values `:increment` and `:decrement` initiate a transition when a numeric value has
 * increased or decreased in value.
 * - A function is executed each time a state change occurs in the animation trigger element.
 * The animation steps run when the function returns true.
 *
 * @param steps One or more animation objects, as returned by the `animate()` or
 * `sequence()` function, that form a transformation from one state to another.
 * A sequence is used by default when you pass an array.
 * @param options An options object that can contain a delay value for the start of the animation,
 * and additional developer-defined parameters. Provided values for additional parameters are used
 * as defaults, and override values can be passed to the caller on invocation.
 * @returns An object that encapsulates the transition data.
 *
 * @usageNotes
 * The template associated with a component binds an animation trigger to an element.
 *
 * ```HTML
 * <!-- somewhere inside of my-component-tpl.html -->
 * <div [@myAnimationTrigger]="myStatusExp">...</div>
 * ```
 *
 * All transitions are defined within an animation trigger,
 * along with named states that the transitions change to and from.
 *
 * ```typescript
 * trigger("myAnimationTrigger", [
 *  // define states
 *  state("on", style({ background: "green" })),
 *  state("off", style({ background: "grey" })),
 *  ...]
 * ```
 *
 * Note that when you call the `sequence()` function within a `{@link animations/group group()}`
 * or a `transition()` call, execution does not continue to the next instruction
 * until each of the inner animation steps have completed.
 *
 * ### Syntax examples
 *
 * The following examples define transitions between the two defined states (and default states),
 * using various options:
 *
 * ```typescript
 * // Transition occurs when the state value
 * // bound to "myAnimationTrigger" changes from "on" to "off"
 * transition("on => off", animate(500))
 * // Run the same animation for both directions
 * transition("on <=> off", animate(500))
 * // Define multiple state-change pairs separated by commas
 * transition("on => off, off => void", animate(500))
 * ```
 *
 * ### Special values for state-change expressions
 *
 * - Catch-all state change for when an element is inserted into the page and the
 * destination state is unknown:
 *
 * ```typescript
 * transition("void => *", [
 *  style({ opacity: 0 }),
 *  animate(500)
 *  ])
 * ```
 *
 * - Capture a state change between any states:
 *
 *  `transition("* => *", animate("1s 0s"))`
 *
 * - Entry and exit transitions:
 *
 * ```typescript
 * transition(":enter", [
 *   style({ opacity: 0 }),
 *   animate(500, style({ opacity: 1 }))
 *   ]),
 * transition(":leave", [
 *   animate(500, style({ opacity: 0 }))
 *   ])
 * ```
 *
 * - Use `:increment` and `:decrement` to initiate transitions:
 *
 * ```typescript
 * transition(":increment", group([
 *  query(':enter', [
 *     style({ left: '100%' }),
 *     animate('0.5s ease-out', style('*'))
 *   ]),
 *  query(':leave', [
 *     animate('0.5s ease-out', style({ left: '-100%' }))
 *  ])
 * ]))
 *
 * transition(":decrement", group([
 *  query(':enter', [
 *     style({ left: '100%' }),
 *     animate('0.5s ease-out', style('*'))
 *   ]),
 *  query(':leave', [
 *     animate('0.5s ease-out', style({ left: '-100%' }))
 *  ])
 * ]))
 * ```
 *
 * ### State-change functions
 *
 * Here is an example of a `fromState` specified as a state-change function that invokes an
 * animation when true:
 *
 * ```typescript
 * transition((fromState, toState) =>
 *  {
 *   return fromState == "off" && toState == "on";
 *  },
 *  animate("1s 0s"))
 * ```
 *
 * ### Animating to the final state
 *
 * If the final step in a transition is a call to `animate()` that uses a timing value
 * with no style data, that step is automatically considered the final animation arc,
 * for the element to reach the final state. Angular automatically adds or removes
 * CSS styles to ensure that the element is in the correct final state.
 *
 * The following example defines a transition that starts by hiding the element,
 * then makes sure that it animates properly to whatever state is currently active for trigger:
 *
 * ```typescript
 * transition("void => *", [
 *   style({ opacity: 0 }),
 *   animate(500)
 *  ])
 * ```
 * ### Boolean value matching
 * If a trigger binding value is a Boolean, it can be matched using a transition expression
 * that compares true and false or 1 and 0. For example:
 *
 * ```
 * // in the template
 * <div [@openClose]="open ? true : false">...</div>
 * // in the component metadata
 * trigger('openClose', [
 *   state('true', style({ height: '*' })),
 *   state('false', style({ height: '0px' })),
 *   transition('false <=> true', animate(500))
 * ])
 * ```
 *
 * @publicApi
 **/
export function transition(stateChangeExpr, steps, options = null) {
    return { type: 1 /* Transition */, expr: stateChangeExpr, animation: steps, options };
}
/**
 * Produces a reusable animation that can be invoked in another animation or sequence,
 * by calling the `useAnimation()` function.
 *
 * @param steps One or more animation objects, as returned by the `animate()`
 * or `sequence()` function, that form a transformation from one state to another.
 * A sequence is used by default when you pass an array.
 * @param options An options object that can contain a delay value for the start of the
 * animation, and additional developer-defined parameters.
 * Provided values for additional parameters are used as defaults,
 * and override values can be passed to the caller on invocation.
 * @returns An object that encapsulates the animation data.
 *
 * @usageNotes
 * The following example defines a reusable animation, providing some default parameter
 * values.
 *
 * ```typescript
 * var fadeAnimation = animation([
 *   style({ opacity: '{{ start }}' }),
 *   animate('{{ time }}',
 *   style({ opacity: '{{ end }}'}))
 *   ],
 *   { params: { time: '1000ms', start: 0, end: 1 }});
 * ```
 *
 * The following invokes the defined animation with a call to `useAnimation()`,
 * passing in override parameter values.
 *
 * ```js
 * useAnimation(fadeAnimation, {
 *   params: {
 *     time: '2s',
 *     start: 1,
 *     end: 0
 *   }
 * })
 * ```
 *
 * If any of the passed-in parameter values are missing from this call,
 * the default values are used. If one or more parameter values are missing before a step is
 * animated, `useAnimation()` throws an error.
 *
 * @publicApi
 */
export function animation(steps, options = null) {
    return { type: 8 /* Reference */, animation: steps, options };
}
/**
 * Executes a queried inner animation element within an animation sequence.
 *
 * @param options An options object that can contain a delay value for the start of the
 * animation, and additional override values for developer-defined parameters.
 * @return An object that encapsulates the child animation data.
 *
 * @usageNotes
 * Each time an animation is triggered in Angular, the parent animation
 * has priority and any child animations are blocked. In order
 * for a child animation to run, the parent animation must query each of the elements
 * containing child animations, and run them using this function.
 *
 * Note that this feature is designed to be used with `query()` and it will only work
 * with animations that are assigned using the Angular animation library. CSS keyframes
 * and transitions are not handled by this API.
 *
 * @publicApi
 */
export function animateChild(options = null) {
    return { type: 9 /* AnimateChild */, options };
}
/**
 * Starts a reusable animation that is created using the `animation()` function.
 *
 * @param animation The reusable animation to start.
 * @param options An options object that can contain a delay value for the start of
 * the animation, and additional override values for developer-defined parameters.
 * @return An object that contains the animation parameters.
 *
 * @publicApi
 */
export function useAnimation(animation, options = null) {
    return { type: 10 /* AnimateRef */, animation, options };
}
/**
 * Finds one or more inner elements within the current element that is
 * being animated within a sequence. Use with `animate()`.
 *
 * @param selector The element to query, or a set of elements that contain Angular-specific
 * characteristics, specified with one or more of the following tokens.
 *  - `query(":enter")` or `query(":leave")` : Query for newly inserted/removed elements.
 *  - `query(":animating")` : Query all currently animating elements.
 *  - `query("@triggerName")` : Query elements that contain an animation trigger.
 *  - `query("@*")` : Query all elements that contain an animation triggers.
 *  - `query(":self")` : Include the current element into the animation sequence.
 *
 * @param animation One or more animation steps to apply to the queried element or elements.
 * An array is treated as an animation sequence.
 * @param options An options object. Use the 'limit' field to limit the total number of
 * items to collect.
 * @return An object that encapsulates the query data.
 *
 * @usageNotes
 * Tokens can be merged into a combined query selector string. For example:
 *
 * ```typescript
 *  query(':self, .record:enter, .record:leave, @subTrigger', [...])
 * ```
 *
 * The `query()` function collects multiple elements and works internally by using
 * `element.querySelectorAll`. Use the `limit` field of an options object to limit
 * the total number of items to be collected. For example:
 *
 * ```js
 * query('div', [
 *   animate(...),
 *   animate(...)
 * ], { limit: 1 })
 * ```
 *
 * By default, throws an error when zero items are found. Set the
 * `optional` flag to ignore this error. For example:
 *
 * ```js
 * query('.some-element-that-may-not-be-there', [
 *   animate(...),
 *   animate(...)
 * ], { optional: true })
 * ```
 *
 * ### Usage Example
 *
 * The following example queries for inner elements and animates them
 * individually using `animate()`.
 *
 * ```typescript
 * @Component({
 *   selector: 'inner',
 *   template: `
 *     <div [@queryAnimation]="exp">
 *       <h1>Title</h1>
 *       <div class="content">
 *         Blah blah blah
 *       </div>
 *     </div>
 *   `,
 *   animations: [
 *    trigger('queryAnimation', [
 *      transition('* => goAnimate', [
 *        // hide the inner elements
 *        query('h1', style({ opacity: 0 })),
 *        query('.content', style({ opacity: 0 })),
 *
 *        // animate the inner elements in, one by one
 *        query('h1', animate(1000, style({ opacity: 1 }))),
 *        query('.content', animate(1000, style({ opacity: 1 }))),
 *      ])
 *    ])
 *  ]
 * })
 * class Cmp {
 *   exp = '';
 *
 *   goAnimate() {
 *     this.exp = 'goAnimate';
 *   }
 * }
 * ```
 *
 * @publicApi
 */
export function query(selector, animation, options = null) {
    return { type: 11 /* Query */, selector, animation, options };
}
/**
 * Use within an animation `query()` call to issue a timing gap after
 * each queried item is animated.
 *
 * @param timings A delay value.
 * @param animation One ore more animation steps.
 * @returns An object that encapsulates the stagger data.
 *
 * @usageNotes
 * In the following example, a container element wraps a list of items stamped out
 * by an `ngFor`. The container element contains an animation trigger that will later be set
 * to query for each of the inner items.
 *
 * Each time items are added, the opacity fade-in animation runs,
 * and each removed item is faded out.
 * When either of these animations occur, the stagger effect is
 * applied after each item's animation is started.
 *
 * ```html
 * <!-- list.component.html -->
 * <button (click)="toggle()">Show / Hide Items</button>
 * <hr />
 * <div [@listAnimation]="items.length">
 *   <div *ngFor="let item of items">
 *     {{ item }}
 *   </div>
 * </div>
 * ```
 *
 * Here is the component code:
 *
 * ```typescript
 * import {trigger, transition, style, animate, query, stagger} from '@angular/animations';
 * @Component({
 *   templateUrl: 'list.component.html',
 *   animations: [
 *     trigger('listAnimation', [
 *     ...
 *     ])
 *   ]
 * })
 * class ListComponent {
 *   items = [];
 *
 *   showItems() {
 *     this.items = [0,1,2,3,4];
 *   }
 *
 *   hideItems() {
 *     this.items = [];
 *   }
 *
 *   toggle() {
 *     this.items.length ? this.hideItems() : this.showItems();
 *    }
 *  }
 * ```
 *
 * Here is the animation trigger code:
 *
 * ```typescript
 * trigger('listAnimation', [
 *   transition('* => *', [ // each time the binding value changes
 *     query(':leave', [
 *       stagger(100, [
 *         animate('0.5s', style({ opacity: 0 }))
 *       ])
 *     ]),
 *     query(':enter', [
 *       style({ opacity: 0 }),
 *       stagger(100, [
 *         animate('0.5s', style({ opacity: 1 }))
 *       ])
 *     ])
 *   ])
 * ])
 * ```
 *
 * @publicApi
 */
export function stagger(timings, animation) {
    return { type: 12 /* Stagger */, timings, animation };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW5pbWF0aW9uX21ldGFkYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvYW5pbWF0aW9ucy9zcmMvYW5pbWF0aW9uX21ldGFkYXRhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7R0FNRztBQStKSDs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQztBQXlSOUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1KRztBQUNILE1BQU0sVUFBVSxPQUFPLENBQUMsSUFBWSxFQUFFLFdBQWdDO0lBQ3BFLE9BQU8sRUFBQyxJQUFJLGlCQUErQixFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsT0FBTyxFQUFFLEVBQUUsRUFBQyxDQUFDO0FBQy9FLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeURHO0FBQ0gsTUFBTSxVQUFVLE9BQU8sQ0FDbkIsT0FBc0IsRUFDdEIsU0FDSSxJQUFJO0lBQ1YsT0FBTyxFQUFDLElBQUksaUJBQStCLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQyxDQUFDO0FBQ2hFLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ0c7QUFDSCxNQUFNLFVBQVUsS0FBSyxDQUNqQixLQUEwQixFQUFFLFVBQWlDLElBQUk7SUFDbkUsT0FBTyxFQUFDLElBQUksZUFBNkIsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDLENBQUM7QUFDN0QsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQWdDSTtBQUNKLE1BQU0sVUFBVSxRQUFRLENBQ3BCLEtBQTBCLEVBQUUsVUFBaUMsSUFBSTtJQUNuRSxPQUFPLEVBQUMsSUFBSSxrQkFBZ0MsRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFDLENBQUM7QUFDaEUsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQXNDSTtBQUNKLE1BQU0sVUFBVSxLQUFLLENBQUMsTUFDMkM7SUFDL0QsT0FBTyxFQUFDLElBQUksZUFBNkIsRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUMsQ0FBQztBQUMzRSxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUE0Qkk7QUFDSixNQUFNLFVBQVUsS0FBSyxDQUNqQixJQUFZLEVBQUUsTUFBOEIsRUFDNUMsT0FBeUM7SUFDM0MsT0FBTyxFQUFDLElBQUksZUFBNkIsRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQyxDQUFDO0FBQ3BFLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E0Q0c7QUFDSCxNQUFNLFVBQVUsU0FBUyxDQUFDLEtBQStCO0lBQ3ZELE9BQU8sRUFBQyxJQUFJLG1CQUFpQyxFQUFFLEtBQUssRUFBQyxDQUFDO0FBQ3hELENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUF1S0k7QUFDSixNQUFNLFVBQVUsVUFBVSxDQUN0QixlQUMrRixFQUMvRixLQUE0QyxFQUM1QyxVQUFpQyxJQUFJO0lBQ3ZDLE9BQU8sRUFBQyxJQUFJLG9CQUFrQyxFQUFFLElBQUksRUFBRSxlQUFlLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUMsQ0FBQztBQUNwRyxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNENHO0FBQ0gsTUFBTSxVQUFVLFNBQVMsQ0FDckIsS0FBNEMsRUFDNUMsVUFBaUMsSUFBSTtJQUN2QyxPQUFPLEVBQUMsSUFBSSxtQkFBaUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBQyxDQUFDO0FBQzVFLENBQUM7QUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBa0JHO0FBQ0gsTUFBTSxVQUFVLFlBQVksQ0FBQyxVQUFvQyxJQUFJO0lBRW5FLE9BQU8sRUFBQyxJQUFJLHNCQUFvQyxFQUFFLE9BQU8sRUFBQyxDQUFDO0FBQzdELENBQUM7QUFFRDs7Ozs7Ozs7O0dBU0c7QUFDSCxNQUFNLFVBQVUsWUFBWSxDQUN4QixTQUFxQyxFQUNyQyxVQUFpQyxJQUFJO0lBQ3ZDLE9BQU8sRUFBQyxJQUFJLHFCQUFrQyxFQUFFLFNBQVMsRUFBRSxPQUFPLEVBQUMsQ0FBQztBQUN0RSxDQUFDO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0ZHO0FBQ0gsTUFBTSxVQUFVLEtBQUssQ0FDakIsUUFBZ0IsRUFBRSxTQUFnRCxFQUNsRSxVQUFzQyxJQUFJO0lBQzVDLE9BQU8sRUFBQyxJQUFJLGdCQUE2QixFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFDLENBQUM7QUFDM0UsQ0FBQztBQUVEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBK0VHO0FBQ0gsTUFBTSxVQUFVLE9BQU8sQ0FBQyxPQUFzQixFQUFFLFNBQWdEO0lBRTlGLE9BQU8sRUFBQyxJQUFJLGtCQUErQixFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUMsQ0FBQztBQUNuRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IEdvb2dsZSBMTEMgQWxsIFJpZ2h0cyBSZXNlcnZlZC5cbiAqXG4gKiBVc2Ugb2YgdGhpcyBzb3VyY2UgY29kZSBpcyBnb3Zlcm5lZCBieSBhbiBNSVQtc3R5bGUgbGljZW5zZSB0aGF0IGNhbiBiZVxuICogZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBhdCBodHRwczovL2FuZ3VsYXIuaW8vbGljZW5zZVxuICovXG5cbi8qKlxuICogUmVwcmVzZW50cyBhIHNldCBvZiBDU1Mgc3R5bGVzIGZvciB1c2UgaW4gYW4gYW5pbWF0aW9uIHN0eWxlLlxuICovXG5leHBvcnQgaW50ZXJmYWNlIMm1U3R5bGVEYXRhIHtcbiAgW2tleTogc3RyaW5nXTogc3RyaW5nfG51bWJlcjtcbn1cblxuLyoqXG4gKiBSZXByZXNlbnRzIGFuaW1hdGlvbi1zdGVwIHRpbWluZyBwYXJhbWV0ZXJzIGZvciBhbiBhbmltYXRpb24gc3RlcC5cbiAqIEBzZWUgYGFuaW1hdGUoKWBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBkZWNsYXJlIHR5cGUgQW5pbWF0ZVRpbWluZ3MgPSB7XG4gIC8qKlxuICAgKiBUaGUgZnVsbCBkdXJhdGlvbiBvZiBhbiBhbmltYXRpb24gc3RlcC4gQSBudW1iZXIgYW5kIG9wdGlvbmFsIHRpbWUgdW5pdCxcbiAgICogc3VjaCBhcyBcIjFzXCIgb3IgXCIxMG1zXCIgZm9yIG9uZSBzZWNvbmQgYW5kIDEwIG1pbGxpc2Vjb25kcywgcmVzcGVjdGl2ZWx5LlxuICAgKiBUaGUgZGVmYXVsdCB1bml0IGlzIG1pbGxpc2Vjb25kcy5cbiAgICovXG4gIGR1cmF0aW9uOiBudW1iZXIsXG4gIC8qKlxuICAgKiBUaGUgZGVsYXkgaW4gYXBwbHlpbmcgYW4gYW5pbWF0aW9uIHN0ZXAuIEEgbnVtYmVyIGFuZCBvcHRpb25hbCB0aW1lIHVuaXQuXG4gICAqIFRoZSBkZWZhdWx0IHVuaXQgaXMgbWlsbGlzZWNvbmRzLlxuICAgKi9cbiAgZGVsYXk6IG51bWJlcixcbiAgLyoqXG4gICAqIEFuIGVhc2luZyBzdHlsZSB0aGF0IGNvbnRyb2xzIGhvdyBhbiBhbmltYXRpb25zIHN0ZXAgYWNjZWxlcmF0ZXNcbiAgICogYW5kIGRlY2VsZXJhdGVzIGR1cmluZyBpdHMgcnVuIHRpbWUuIEFuIGVhc2luZyBmdW5jdGlvbiBzdWNoIGFzIGBjdWJpYy1iZXppZXIoKWAsXG4gICAqIG9yIG9uZSBvZiB0aGUgZm9sbG93aW5nIGNvbnN0YW50czpcbiAgICogLSBgZWFzZS1pbmBcbiAgICogLSBgZWFzZS1vdXRgXG4gICAqIC0gYGVhc2UtaW4tYW5kLW91dGBcbiAgICovXG4gIGVhc2luZzogc3RyaW5nIHwgbnVsbFxufTtcblxuLyoqXG4gKiBAZGVzY3JpcHRpb24gT3B0aW9ucyB0aGF0IGNvbnRyb2wgYW5pbWF0aW9uIHN0eWxpbmcgYW5kIHRpbWluZy5cbiAqXG4gKiBUaGUgZm9sbG93aW5nIGFuaW1hdGlvbiBmdW5jdGlvbnMgYWNjZXB0IGBBbmltYXRpb25PcHRpb25zYCBkYXRhOlxuICpcbiAqIC0gYHRyYW5zaXRpb24oKWBcbiAqIC0gYHNlcXVlbmNlKClgXG4gKiAtIGB7QGxpbmsgYW5pbWF0aW9ucy9ncm91cCBncm91cCgpfWBcbiAqIC0gYHF1ZXJ5KClgXG4gKiAtIGBhbmltYXRpb24oKWBcbiAqIC0gYHVzZUFuaW1hdGlvbigpYFxuICogLSBgYW5pbWF0ZUNoaWxkKClgXG4gKlxuICogUHJvZ3JhbW1hdGljIGFuaW1hdGlvbnMgYnVpbHQgdXNpbmcgdGhlIGBBbmltYXRpb25CdWlsZGVyYCBzZXJ2aWNlIGFsc29cbiAqIG1ha2UgdXNlIG9mIGBBbmltYXRpb25PcHRpb25zYC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBkZWNsYXJlIGludGVyZmFjZSBBbmltYXRpb25PcHRpb25zIHtcbiAgLyoqXG4gICAqIFNldHMgYSB0aW1lLWRlbGF5IGZvciBpbml0aWF0aW5nIGFuIGFuaW1hdGlvbiBhY3Rpb24uXG4gICAqIEEgbnVtYmVyIGFuZCBvcHRpb25hbCB0aW1lIHVuaXQsIHN1Y2ggYXMgXCIxc1wiIG9yIFwiMTBtc1wiIGZvciBvbmUgc2Vjb25kXG4gICAqIGFuZCAxMCBtaWxsaXNlY29uZHMsIHJlc3BlY3RpdmVseS5UaGUgZGVmYXVsdCB1bml0IGlzIG1pbGxpc2Vjb25kcy5cbiAgICogRGVmYXVsdCB2YWx1ZSBpcyAwLCBtZWFuaW5nIG5vIGRlbGF5LlxuICAgKi9cbiAgZGVsYXk/OiBudW1iZXJ8c3RyaW5nO1xuICAvKipcbiAgICogQSBzZXQgb2YgZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycyB0aGF0IG1vZGlmeSBzdHlsaW5nIGFuZCB0aW1pbmdcbiAgICogd2hlbiBhbiBhbmltYXRpb24gYWN0aW9uIHN0YXJ0cy4gQW4gYXJyYXkgb2Yga2V5LXZhbHVlIHBhaXJzLCB3aGVyZSB0aGUgcHJvdmlkZWQgdmFsdWVcbiAgICogaXMgdXNlZCBhcyBhIGRlZmF1bHQuXG4gICAqL1xuICBwYXJhbXM/OiB7W25hbWU6IHN0cmluZ106IGFueX07XG59XG5cbi8qKlxuICogQWRkcyBkdXJhdGlvbiBvcHRpb25zIHRvIGNvbnRyb2wgYW5pbWF0aW9uIHN0eWxpbmcgYW5kIHRpbWluZyBmb3IgYSBjaGlsZCBhbmltYXRpb24uXG4gKlxuICogQHNlZSBgYW5pbWF0ZUNoaWxkKClgXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZGVjbGFyZSBpbnRlcmZhY2UgQW5pbWF0ZUNoaWxkT3B0aW9ucyBleHRlbmRzIEFuaW1hdGlvbk9wdGlvbnMge1xuICBkdXJhdGlvbj86IG51bWJlcnxzdHJpbmc7XG59XG5cbi8qKlxuICogQGRlc2NyaXB0aW9uIENvbnN0YW50cyBmb3IgdGhlIGNhdGVnb3JpZXMgb2YgcGFyYW1ldGVycyB0aGF0IGNhbiBiZSBkZWZpbmVkIGZvciBhbmltYXRpb25zLlxuICpcbiAqIEEgY29ycmVzcG9uZGluZyBmdW5jdGlvbiBkZWZpbmVzIGEgc2V0IG9mIHBhcmFtZXRlcnMgZm9yIGVhY2ggY2F0ZWdvcnksIGFuZFxuICogY29sbGVjdHMgdGhlbSBpbnRvIGEgY29ycmVzcG9uZGluZyBgQW5pbWF0aW9uTWV0YWRhdGFgIG9iamVjdC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBlbnVtIEFuaW1hdGlvbk1ldGFkYXRhVHlwZSB7XG4gIC8qKlxuICAgKiBBc3NvY2lhdGVzIGEgbmFtZWQgYW5pbWF0aW9uIHN0YXRlIHdpdGggYSBzZXQgb2YgQ1NTIHN0eWxlcy5cbiAgICogU2VlIGBzdGF0ZSgpYFxuICAgKi9cbiAgU3RhdGUgPSAwLFxuICAvKipcbiAgICogRGF0YSBmb3IgYSB0cmFuc2l0aW9uIGZyb20gb25lIGFuaW1hdGlvbiBzdGF0ZSB0byBhbm90aGVyLlxuICAgKiBTZWUgYHRyYW5zaXRpb24oKWBcbiAgICovXG4gIFRyYW5zaXRpb24gPSAxLFxuICAvKipcbiAgICogQ29udGFpbnMgYSBzZXQgb2YgYW5pbWF0aW9uIHN0ZXBzLlxuICAgKiBTZWUgYHNlcXVlbmNlKClgXG4gICAqL1xuICBTZXF1ZW5jZSA9IDIsXG4gIC8qKlxuICAgKiBDb250YWlucyBhIHNldCBvZiBhbmltYXRpb24gc3RlcHMuXG4gICAqIFNlZSBge0BsaW5rIGFuaW1hdGlvbnMvZ3JvdXAgZ3JvdXAoKX1gXG4gICAqL1xuICBHcm91cCA9IDMsXG4gIC8qKlxuICAgKiBDb250YWlucyBhbiBhbmltYXRpb24gc3RlcC5cbiAgICogU2VlIGBhbmltYXRlKClgXG4gICAqL1xuICBBbmltYXRlID0gNCxcbiAgLyoqXG4gICAqIENvbnRhaW5zIGEgc2V0IG9mIGFuaW1hdGlvbiBzdGVwcy5cbiAgICogU2VlIGBrZXlmcmFtZXMoKWBcbiAgICovXG4gIEtleWZyYW1lcyA9IDUsXG4gIC8qKlxuICAgKiBDb250YWlucyBhIHNldCBvZiBDU1MgcHJvcGVydHktdmFsdWUgcGFpcnMgaW50byBhIG5hbWVkIHN0eWxlLlxuICAgKiBTZWUgYHN0eWxlKClgXG4gICAqL1xuICBTdHlsZSA9IDYsXG4gIC8qKlxuICAgKiBBc3NvY2lhdGVzIGFuIGFuaW1hdGlvbiB3aXRoIGFuIGVudHJ5IHRyaWdnZXIgdGhhdCBjYW4gYmUgYXR0YWNoZWQgdG8gYW4gZWxlbWVudC5cbiAgICogU2VlIGB0cmlnZ2VyKClgXG4gICAqL1xuICBUcmlnZ2VyID0gNyxcbiAgLyoqXG4gICAqIENvbnRhaW5zIGEgcmUtdXNhYmxlIGFuaW1hdGlvbi5cbiAgICogU2VlIGBhbmltYXRpb24oKWBcbiAgICovXG4gIFJlZmVyZW5jZSA9IDgsXG4gIC8qKlxuICAgKiBDb250YWlucyBkYXRhIHRvIHVzZSBpbiBleGVjdXRpbmcgY2hpbGQgYW5pbWF0aW9ucyByZXR1cm5lZCBieSBhIHF1ZXJ5LlxuICAgKiBTZWUgYGFuaW1hdGVDaGlsZCgpYFxuICAgKi9cbiAgQW5pbWF0ZUNoaWxkID0gOSxcbiAgLyoqXG4gICAqIENvbnRhaW5zIGFuaW1hdGlvbiBwYXJhbWV0ZXJzIGZvciBhIHJlLXVzYWJsZSBhbmltYXRpb24uXG4gICAqIFNlZSBgdXNlQW5pbWF0aW9uKClgXG4gICAqL1xuICBBbmltYXRlUmVmID0gMTAsXG4gIC8qKlxuICAgKiBDb250YWlucyBjaGlsZC1hbmltYXRpb24gcXVlcnkgZGF0YS5cbiAgICogU2VlIGBxdWVyeSgpYFxuICAgKi9cbiAgUXVlcnkgPSAxMSxcbiAgLyoqXG4gICAqIENvbnRhaW5zIGRhdGEgZm9yIHN0YWdnZXJpbmcgYW4gYW5pbWF0aW9uIHNlcXVlbmNlLlxuICAgKiBTZWUgYHN0YWdnZXIoKWBcbiAgICovXG4gIFN0YWdnZXIgPSAxMlxufVxuXG4vKipcbiAqIFNwZWNpZmllcyBhdXRvbWF0aWMgc3R5bGluZy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBjb25zdCBBVVRPX1NUWUxFID0gJyonO1xuXG4vKipcbiAqIEJhc2UgZm9yIGFuaW1hdGlvbiBkYXRhIHN0cnVjdHVyZXMuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgdHlwZTogQW5pbWF0aW9uTWV0YWRhdGFUeXBlO1xufVxuXG4vKipcbiAqIENvbnRhaW5zIGFuIGFuaW1hdGlvbiB0cmlnZ2VyLiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5IHRoZVxuICogYHRyaWdnZXIoKWAgZnVuY3Rpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvblRyaWdnZXJNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIFRoZSB0cmlnZ2VyIG5hbWUsIHVzZWQgdG8gYXNzb2NpYXRlIGl0IHdpdGggYW4gZWxlbWVudC4gVW5pcXVlIHdpdGhpbiB0aGUgY29tcG9uZW50LlxuICAgKi9cbiAgbmFtZTogc3RyaW5nO1xuICAvKipcbiAgICogQW4gYW5pbWF0aW9uIGRlZmluaXRpb24gb2JqZWN0LCBjb250YWluaW5nIGFuIGFycmF5IG9mIHN0YXRlIGFuZCB0cmFuc2l0aW9uIGRlY2xhcmF0aW9ucy5cbiAgICovXG4gIGRlZmluaXRpb25zOiBBbmltYXRpb25NZXRhZGF0YVtdO1xuICAvKipcbiAgICogQW4gb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBhIGRlbGF5IGFuZFxuICAgKiBkZXZlbG9wZXItZGVmaW5lZCBwYXJhbWV0ZXJzIHRoYXQgcHJvdmlkZSBzdHlsaW5nIGRlZmF1bHRzIGFuZFxuICAgKiBjYW4gYmUgb3ZlcnJpZGRlbiBvbiBpbnZvY2F0aW9uLiBEZWZhdWx0IGRlbGF5IGlzIDAuXG4gICAqL1xuICBvcHRpb25zOiB7cGFyYW1zPzoge1tuYW1lOiBzdHJpbmddOiBhbnl9fXxudWxsO1xufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBhbiBhbmltYXRpb24gc3RhdGUgYnkgYXNzb2NpYXRpbmcgYSBzdGF0ZSBuYW1lIHdpdGggYSBzZXQgb2YgQ1NTIHN0eWxlcy5cbiAqIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlIGBzdGF0ZSgpYCBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQW5pbWF0aW9uU3RhdGVNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIFRoZSBzdGF0ZSBuYW1lLCB1bmlxdWUgd2l0aGluIHRoZSBjb21wb25lbnQuXG4gICAqL1xuICBuYW1lOiBzdHJpbmc7XG4gIC8qKlxuICAgKiAgVGhlIENTUyBzdHlsZXMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgc3RhdGUuXG4gICAqL1xuICBzdHlsZXM6IEFuaW1hdGlvblN0eWxlTWV0YWRhdGE7XG4gIC8qKlxuICAgKiBBbiBvcHRpb25zIG9iamVjdCBjb250YWluaW5nXG4gICAqIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMgdGhhdCBwcm92aWRlIHN0eWxpbmcgZGVmYXVsdHMgYW5kXG4gICAqIGNhbiBiZSBvdmVycmlkZGVuIG9uIGludm9jYXRpb24uXG4gICAqL1xuICBvcHRpb25zPzoge3BhcmFtczoge1tuYW1lOiBzdHJpbmddOiBhbnl9fTtcbn1cblxuLyoqXG4gKiBFbmNhcHN1bGF0ZXMgYW4gYW5pbWF0aW9uIHRyYW5zaXRpb24uIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlXG4gKiBgdHJhbnNpdGlvbigpYCBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQW5pbWF0aW9uVHJhbnNpdGlvbk1ldGFkYXRhIGV4dGVuZHMgQW5pbWF0aW9uTWV0YWRhdGEge1xuICAvKipcbiAgICogQW4gZXhwcmVzc2lvbiB0aGF0IGRlc2NyaWJlcyBhIHN0YXRlIGNoYW5nZS5cbiAgICovXG4gIGV4cHI6IHN0cmluZ3xcbiAgICAgICgoZnJvbVN0YXRlOiBzdHJpbmcsIHRvU3RhdGU6IHN0cmluZywgZWxlbWVudD86IGFueSxcbiAgICAgICAgcGFyYW1zPzoge1trZXk6IHN0cmluZ106IGFueX0pID0+IGJvb2xlYW4pO1xuICAvKipcbiAgICogT25lIG9yIG1vcmUgYW5pbWF0aW9uIG9iamVjdHMgdG8gd2hpY2ggdGhpcyB0cmFuc2l0aW9uIGFwcGxpZXMuXG4gICAqL1xuICBhbmltYXRpb246IEFuaW1hdGlvbk1ldGFkYXRhfEFuaW1hdGlvbk1ldGFkYXRhW107XG4gIC8qKlxuICAgKiBBbiBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIGEgZGVsYXkgYW5kXG4gICAqIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMgdGhhdCBwcm92aWRlIHN0eWxpbmcgZGVmYXVsdHMgYW5kXG4gICAqIGNhbiBiZSBvdmVycmlkZGVuIG9uIGludm9jYXRpb24uIERlZmF1bHQgZGVsYXkgaXMgMC5cbiAgICovXG4gIG9wdGlvbnM6IEFuaW1hdGlvbk9wdGlvbnN8bnVsbDtcbn1cblxuLyoqXG4gKiBFbmNhcHN1bGF0ZXMgYSByZXVzYWJsZSBhbmltYXRpb24sIHdoaWNoIGlzIGEgY29sbGVjdGlvbiBvZiBpbmRpdmlkdWFsIGFuaW1hdGlvbiBzdGVwcy5cbiAqIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlIGBhbmltYXRpb24oKWAgZnVuY3Rpb24sIGFuZFxuICogcGFzc2VkIHRvIHRoZSBgdXNlQW5pbWF0aW9uKClgIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgLyoqXG4gICAqICBPbmUgb3IgbW9yZSBhbmltYXRpb24gc3RlcCBvYmplY3RzLlxuICAgKi9cbiAgYW5pbWF0aW9uOiBBbmltYXRpb25NZXRhZGF0YXxBbmltYXRpb25NZXRhZGF0YVtdO1xuICAvKipcbiAgICogQW4gb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBhIGRlbGF5IGFuZFxuICAgKiBkZXZlbG9wZXItZGVmaW5lZCBwYXJhbWV0ZXJzIHRoYXQgcHJvdmlkZSBzdHlsaW5nIGRlZmF1bHRzIGFuZFxuICAgKiBjYW4gYmUgb3ZlcnJpZGRlbiBvbiBpbnZvY2F0aW9uLiBEZWZhdWx0IGRlbGF5IGlzIDAuXG4gICAqL1xuICBvcHRpb25zOiBBbmltYXRpb25PcHRpb25zfG51bGw7XG59XG5cbi8qKlxuICogRW5jYXBzdWxhdGVzIGFuIGFuaW1hdGlvbiBxdWVyeS4gSW5zdGFudGlhdGVkIGFuZCByZXR1cm5lZCBieVxuICogdGhlIGBxdWVyeSgpYCBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQW5pbWF0aW9uUXVlcnlNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgLyoqXG4gICAqICBUaGUgQ1NTIHNlbGVjdG9yIGZvciB0aGlzIHF1ZXJ5LlxuICAgKi9cbiAgc2VsZWN0b3I6IHN0cmluZztcbiAgLyoqXG4gICAqIE9uZSBvciBtb3JlIGFuaW1hdGlvbiBzdGVwIG9iamVjdHMuXG4gICAqL1xuICBhbmltYXRpb246IEFuaW1hdGlvbk1ldGFkYXRhfEFuaW1hdGlvbk1ldGFkYXRhW107XG4gIC8qKlxuICAgKiBBIHF1ZXJ5IG9wdGlvbnMgb2JqZWN0LlxuICAgKi9cbiAgb3B0aW9uczogQW5pbWF0aW9uUXVlcnlPcHRpb25zfG51bGw7XG59XG5cbi8qKlxuICogRW5jYXBzdWxhdGVzIGEga2V5ZnJhbWVzIHNlcXVlbmNlLiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5XG4gKiB0aGUgYGtleWZyYW1lcygpYCBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQW5pbWF0aW9uS2V5ZnJhbWVzU2VxdWVuY2VNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIEFuIGFycmF5IG9mIGFuaW1hdGlvbiBzdHlsZXMuXG4gICAqL1xuICBzdGVwczogQW5pbWF0aW9uU3R5bGVNZXRhZGF0YVtdO1xufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBhbiBhbmltYXRpb24gc3R5bGUuIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnlcbiAqIHRoZSBgc3R5bGUoKWAgZnVuY3Rpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvblN0eWxlTWV0YWRhdGEgZXh0ZW5kcyBBbmltYXRpb25NZXRhZGF0YSB7XG4gIC8qKlxuICAgKiBBIHNldCBvZiBDU1Mgc3R5bGUgcHJvcGVydGllcy5cbiAgICovXG4gIHN0eWxlczogJyonfHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXJ9fEFycmF5PHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXJ9fCcqJz47XG4gIC8qKlxuICAgKiBBIHBlcmNlbnRhZ2Ugb2YgdGhlIHRvdGFsIGFuaW1hdGUgdGltZSBhdCB3aGljaCB0aGUgc3R5bGUgaXMgdG8gYmUgYXBwbGllZC5cbiAgICovXG4gIG9mZnNldDogbnVtYmVyfG51bGw7XG59XG5cbi8qKlxuICogRW5jYXBzdWxhdGVzIGFuIGFuaW1hdGlvbiBzdGVwLiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5XG4gKiB0aGUgYGFuaW1hdGUoKWAgZnVuY3Rpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvbkFuaW1hdGVNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIFRoZSB0aW1pbmcgZGF0YSBmb3IgdGhlIHN0ZXAuXG4gICAqL1xuICB0aW1pbmdzOiBzdHJpbmd8bnVtYmVyfEFuaW1hdGVUaW1pbmdzO1xuICAvKipcbiAgICogQSBzZXQgb2Ygc3R5bGVzIHVzZWQgaW4gdGhlIHN0ZXAuXG4gICAqL1xuICBzdHlsZXM6IEFuaW1hdGlvblN0eWxlTWV0YWRhdGF8QW5pbWF0aW9uS2V5ZnJhbWVzU2VxdWVuY2VNZXRhZGF0YXxudWxsO1xufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBhIGNoaWxkIGFuaW1hdGlvbiwgdGhhdCBjYW4gYmUgcnVuIGV4cGxpY2l0bHkgd2hlbiB0aGUgcGFyZW50IGlzIHJ1bi5cbiAqIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlIGBhbmltYXRlQ2hpbGRgIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGludGVyZmFjZSBBbmltYXRpb25BbmltYXRlQ2hpbGRNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgYSBkZWxheSBhbmRcbiAgICogZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycyB0aGF0IHByb3ZpZGUgc3R5bGluZyBkZWZhdWx0cyBhbmRcbiAgICogY2FuIGJlIG92ZXJyaWRkZW4gb24gaW52b2NhdGlvbi4gRGVmYXVsdCBkZWxheSBpcyAwLlxuICAgKi9cbiAgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9uc3xudWxsO1xufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBhIHJldXNhYmxlIGFuaW1hdGlvbi5cbiAqIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlIGB1c2VBbmltYXRpb24oKWAgZnVuY3Rpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvbkFuaW1hdGVSZWZNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIEFuIGFuaW1hdGlvbiByZWZlcmVuY2Ugb2JqZWN0LlxuICAgKi9cbiAgYW5pbWF0aW9uOiBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YTtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgYSBkZWxheSBhbmRcbiAgICogZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycyB0aGF0IHByb3ZpZGUgc3R5bGluZyBkZWZhdWx0cyBhbmRcbiAgICogY2FuIGJlIG92ZXJyaWRkZW4gb24gaW52b2NhdGlvbi4gRGVmYXVsdCBkZWxheSBpcyAwLlxuICAgKi9cbiAgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9uc3xudWxsO1xufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBhbiBhbmltYXRpb24gc2VxdWVuY2UuXG4gKiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5IHRoZSBgc2VxdWVuY2UoKWAgZnVuY3Rpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvblNlcXVlbmNlTWV0YWRhdGEgZXh0ZW5kcyBBbmltYXRpb25NZXRhZGF0YSB7XG4gIC8qKlxuICAgKiAgQW4gYXJyYXkgb2YgYW5pbWF0aW9uIHN0ZXAgb2JqZWN0cy5cbiAgICovXG4gIHN0ZXBzOiBBbmltYXRpb25NZXRhZGF0YVtdO1xuICAvKipcbiAgICogQW4gb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBhIGRlbGF5IGFuZFxuICAgKiBkZXZlbG9wZXItZGVmaW5lZCBwYXJhbWV0ZXJzIHRoYXQgcHJvdmlkZSBzdHlsaW5nIGRlZmF1bHRzIGFuZFxuICAgKiBjYW4gYmUgb3ZlcnJpZGRlbiBvbiBpbnZvY2F0aW9uLiBEZWZhdWx0IGRlbGF5IGlzIDAuXG4gICAqL1xuICBvcHRpb25zOiBBbmltYXRpb25PcHRpb25zfG51bGw7XG59XG5cbi8qKlxuICogRW5jYXBzdWxhdGVzIGFuIGFuaW1hdGlvbiBncm91cC5cbiAqIEluc3RhbnRpYXRlZCBhbmQgcmV0dXJuZWQgYnkgdGhlIGB7QGxpbmsgYW5pbWF0aW9ucy9ncm91cCBncm91cCgpfWAgZnVuY3Rpb24uXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvbkdyb3VwTWV0YWRhdGEgZXh0ZW5kcyBBbmltYXRpb25NZXRhZGF0YSB7XG4gIC8qKlxuICAgKiBPbmUgb3IgbW9yZSBhbmltYXRpb24gb3Igc3R5bGUgc3RlcHMgdGhhdCBmb3JtIHRoaXMgZ3JvdXAuXG4gICAqL1xuICBzdGVwczogQW5pbWF0aW9uTWV0YWRhdGFbXTtcbiAgLyoqXG4gICAqIEFuIG9wdGlvbnMgb2JqZWN0IGNvbnRhaW5pbmcgYSBkZWxheSBhbmRcbiAgICogZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycyB0aGF0IHByb3ZpZGUgc3R5bGluZyBkZWZhdWx0cyBhbmRcbiAgICogY2FuIGJlIG92ZXJyaWRkZW4gb24gaW52b2NhdGlvbi4gRGVmYXVsdCBkZWxheSBpcyAwLlxuICAgKi9cbiAgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9uc3xudWxsO1xufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBhbmltYXRpb24gcXVlcnkgb3B0aW9ucy5cbiAqIFBhc3NlZCB0byB0aGUgYHF1ZXJ5KClgIGZ1bmN0aW9uLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGRlY2xhcmUgaW50ZXJmYWNlIEFuaW1hdGlvblF1ZXJ5T3B0aW9ucyBleHRlbmRzIEFuaW1hdGlvbk9wdGlvbnMge1xuICAvKipcbiAgICogVHJ1ZSBpZiB0aGlzIHF1ZXJ5IGlzIG9wdGlvbmFsLCBmYWxzZSBpZiBpdCBpcyByZXF1aXJlZC4gRGVmYXVsdCBpcyBmYWxzZS5cbiAgICogQSByZXF1aXJlZCBxdWVyeSB0aHJvd3MgYW4gZXJyb3IgaWYgbm8gZWxlbWVudHMgYXJlIHJldHJpZXZlZCB3aGVuXG4gICAqIHRoZSBxdWVyeSBpcyBleGVjdXRlZC4gQW4gb3B0aW9uYWwgcXVlcnkgZG9lcyBub3QuXG4gICAqXG4gICAqL1xuICBvcHRpb25hbD86IGJvb2xlYW47XG4gIC8qKlxuICAgKiBBIG1heGltdW0gdG90YWwgbnVtYmVyIG9mIHJlc3VsdHMgdG8gcmV0dXJuIGZyb20gdGhlIHF1ZXJ5LlxuICAgKiBJZiBuZWdhdGl2ZSwgcmVzdWx0cyBhcmUgbGltaXRlZCBmcm9tIHRoZSBlbmQgb2YgdGhlIHF1ZXJ5IGxpc3QgdG93YXJkcyB0aGUgYmVnaW5uaW5nLlxuICAgKiBCeSBkZWZhdWx0LCByZXN1bHRzIGFyZSBub3QgbGltaXRlZC5cbiAgICovXG4gIGxpbWl0PzogbnVtYmVyO1xufVxuXG4vKipcbiAqIEVuY2Fwc3VsYXRlcyBwYXJhbWV0ZXJzIGZvciBzdGFnZ2VyaW5nIHRoZSBzdGFydCB0aW1lcyBvZiBhIHNldCBvZiBhbmltYXRpb24gc3RlcHMuXG4gKiBJbnN0YW50aWF0ZWQgYW5kIHJldHVybmVkIGJ5IHRoZSBgc3RhZ2dlcigpYCBmdW5jdGlvbi5cbiAqXG4gKiBAcHVibGljQXBpXG4gKiovXG5leHBvcnQgaW50ZXJmYWNlIEFuaW1hdGlvblN0YWdnZXJNZXRhZGF0YSBleHRlbmRzIEFuaW1hdGlvbk1ldGFkYXRhIHtcbiAgLyoqXG4gICAqIFRoZSB0aW1pbmcgZGF0YSBmb3IgdGhlIHN0ZXBzLlxuICAgKi9cbiAgdGltaW5nczogc3RyaW5nfG51bWJlcjtcbiAgLyoqXG4gICAqIE9uZSBvciBtb3JlIGFuaW1hdGlvbiBzdGVwcy5cbiAgICovXG4gIGFuaW1hdGlvbjogQW5pbWF0aW9uTWV0YWRhdGF8QW5pbWF0aW9uTWV0YWRhdGFbXTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgbmFtZWQgYW5pbWF0aW9uIHRyaWdnZXIsIGNvbnRhaW5pbmcgYSAgbGlzdCBvZiBgc3RhdGUoKWBcbiAqIGFuZCBgdHJhbnNpdGlvbigpYCBlbnRyaWVzIHRvIGJlIGV2YWx1YXRlZCB3aGVuIHRoZSBleHByZXNzaW9uXG4gKiBib3VuZCB0byB0aGUgdHJpZ2dlciBjaGFuZ2VzLlxuICpcbiAqIEBwYXJhbSBuYW1lIEFuIGlkZW50aWZ5aW5nIHN0cmluZy5cbiAqIEBwYXJhbSBkZWZpbml0aW9ucyAgQW4gYW5pbWF0aW9uIGRlZmluaXRpb24gb2JqZWN0LCBjb250YWluaW5nIGFuIGFycmF5IG9mIGBzdGF0ZSgpYFxuICogYW5kIGB0cmFuc2l0aW9uKClgIGRlY2xhcmF0aW9ucy5cbiAqXG4gKiBAcmV0dXJuIEFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUgdHJpZ2dlciBkYXRhLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBEZWZpbmUgYW4gYW5pbWF0aW9uIHRyaWdnZXIgaW4gdGhlIGBhbmltYXRpb25zYCBzZWN0aW9uIG9mIGBAQ29tcG9uZW50YCBtZXRhZGF0YS5cbiAqIEluIHRoZSB0ZW1wbGF0ZSwgcmVmZXJlbmNlIHRoZSB0cmlnZ2VyIGJ5IG5hbWUgYW5kIGJpbmQgaXQgdG8gYSB0cmlnZ2VyIGV4cHJlc3Npb24gdGhhdFxuICogZXZhbHVhdGVzIHRvIGEgZGVmaW5lZCBhbmltYXRpb24gc3RhdGUsIHVzaW5nIHRoZSBmb2xsb3dpbmcgZm9ybWF0OlxuICpcbiAqIGBbQHRyaWdnZXJOYW1lXT1cImV4cHJlc3Npb25cImBcbiAqXG4gKiBBbmltYXRpb24gdHJpZ2dlciBiaW5kaW5ncyBjb252ZXJ0IGFsbCB2YWx1ZXMgdG8gc3RyaW5ncywgYW5kIHRoZW4gbWF0Y2ggdGhlXG4gKiBwcmV2aW91cyBhbmQgY3VycmVudCB2YWx1ZXMgYWdhaW5zdCBhbnkgbGlua2VkIHRyYW5zaXRpb25zLlxuICogQm9vbGVhbnMgY2FuIGJlIHNwZWNpZmllZCBhcyBgMWAgb3IgYHRydWVgIGFuZCBgMGAgb3IgYGZhbHNlYC5cbiAqXG4gKiAjIyMgVXNhZ2UgRXhhbXBsZVxuICpcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSBjcmVhdGVzIGFuIGFuaW1hdGlvbiB0cmlnZ2VyIHJlZmVyZW5jZSBiYXNlZCBvbiB0aGUgcHJvdmlkZWRcbiAqIG5hbWUgdmFsdWUuXG4gKiBUaGUgcHJvdmlkZWQgYW5pbWF0aW9uIHZhbHVlIGlzIGV4cGVjdGVkIHRvIGJlIGFuIGFycmF5IGNvbnNpc3Rpbmcgb2Ygc3RhdGUgYW5kXG4gKiB0cmFuc2l0aW9uIGRlY2xhcmF0aW9ucy5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6IFwibXktY29tcG9uZW50XCIsXG4gKiAgIHRlbXBsYXRlVXJsOiBcIm15LWNvbXBvbmVudC10cGwuaHRtbFwiLFxuICogICBhbmltYXRpb25zOiBbXG4gKiAgICAgdHJpZ2dlcihcIm15QW5pbWF0aW9uVHJpZ2dlclwiLCBbXG4gKiAgICAgICBzdGF0ZSguLi4pLFxuICogICAgICAgc3RhdGUoLi4uKSxcbiAqICAgICAgIHRyYW5zaXRpb24oLi4uKSxcbiAqICAgICAgIHRyYW5zaXRpb24oLi4uKVxuICogICAgIF0pXG4gKiAgIF1cbiAqIH0pXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIG15U3RhdHVzRXhwID0gXCJzb21ldGhpbmdcIjtcbiAqIH1cbiAqIGBgYFxuICpcbiAqIFRoZSB0ZW1wbGF0ZSBhc3NvY2lhdGVkIHdpdGggdGhpcyBjb21wb25lbnQgbWFrZXMgdXNlIG9mIHRoZSBkZWZpbmVkIHRyaWdnZXJcbiAqIGJ5IGJpbmRpbmcgdG8gYW4gZWxlbWVudCB3aXRoaW4gaXRzIHRlbXBsYXRlIGNvZGUuXG4gKlxuICogYGBgaHRtbFxuICogPCEtLSBzb21ld2hlcmUgaW5zaWRlIG9mIG15LWNvbXBvbmVudC10cGwuaHRtbCAtLT5cbiAqIDxkaXYgW0BteUFuaW1hdGlvblRyaWdnZXJdPVwibXlTdGF0dXNFeHBcIj4uLi48L2Rpdj5cbiAqIGBgYFxuICpcbiAqICMjIyBVc2luZyBhbiBpbmxpbmUgZnVuY3Rpb25cbiAqIFRoZSBgdHJhbnNpdGlvbmAgYW5pbWF0aW9uIG1ldGhvZCBhbHNvIHN1cHBvcnRzIHJlYWRpbmcgYW4gaW5saW5lIGZ1bmN0aW9uIHdoaWNoIGNhbiBkZWNpZGVcbiAqIGlmIGl0cyBhc3NvY2lhdGVkIGFuaW1hdGlvbiBzaG91bGQgYmUgcnVuLlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIHRoaXMgbWV0aG9kIGlzIHJ1biBlYWNoIHRpbWUgdGhlIGBteUFuaW1hdGlvblRyaWdnZXJgIHRyaWdnZXIgdmFsdWUgY2hhbmdlcy5cbiAqIGZ1bmN0aW9uIG15SW5saW5lTWF0Y2hlckZuKGZyb21TdGF0ZTogc3RyaW5nLCB0b1N0YXRlOiBzdHJpbmcsIGVsZW1lbnQ6IGFueSwgcGFyYW1zOiB7W2tleTpcbiBzdHJpbmddOiBhbnl9KTogYm9vbGVhbiB7XG4gKiAgIC8vIG5vdGljZSB0aGF0IGBlbGVtZW50YCBhbmQgYHBhcmFtc2AgYXJlIGFsc28gYXZhaWxhYmxlIGhlcmVcbiAqICAgcmV0dXJuIHRvU3RhdGUgPT0gJ3llcy1wbGVhc2UtYW5pbWF0ZSc7XG4gKiB9XG4gKlxuICogQENvbXBvbmVudCh7XG4gKiAgIHNlbGVjdG9yOiAnbXktY29tcG9uZW50JyxcbiAqICAgdGVtcGxhdGVVcmw6ICdteS1jb21wb25lbnQtdHBsLmh0bWwnLFxuICogICBhbmltYXRpb25zOiBbXG4gKiAgICAgdHJpZ2dlcignbXlBbmltYXRpb25UcmlnZ2VyJywgW1xuICogICAgICAgdHJhbnNpdGlvbihteUlubGluZU1hdGNoZXJGbiwgW1xuICogICAgICAgICAvLyB0aGUgYW5pbWF0aW9uIHNlcXVlbmNlIGNvZGVcbiAqICAgICAgIF0pLFxuICogICAgIF0pXG4gKiAgIF1cbiAqIH0pXG4gKiBjbGFzcyBNeUNvbXBvbmVudCB7XG4gKiAgIG15U3RhdHVzRXhwID0gXCJ5ZXMtcGxlYXNlLWFuaW1hdGVcIjtcbiAqIH1cbiAqIGBgYFxuICpcbiAqICMjIyBEaXNhYmxpbmcgQW5pbWF0aW9uc1xuICogV2hlbiB0cnVlLCB0aGUgc3BlY2lhbCBhbmltYXRpb24gY29udHJvbCBiaW5kaW5nIGBALmRpc2FibGVkYCBiaW5kaW5nIHByZXZlbnRzXG4gKiBhbGwgYW5pbWF0aW9ucyBmcm9tIHJlbmRlcmluZy5cbiAqIFBsYWNlIHRoZSAgYEAuZGlzYWJsZWRgIGJpbmRpbmcgb24gYW4gZWxlbWVudCB0byBkaXNhYmxlXG4gKiBhbmltYXRpb25zIG9uIHRoZSBlbGVtZW50IGl0c2VsZiwgYXMgd2VsbCBhcyBhbnkgaW5uZXIgYW5pbWF0aW9uIHRyaWdnZXJzXG4gKiB3aXRoaW4gdGhlIGVsZW1lbnQuXG4gKlxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIHNob3dzIGhvdyB0byB1c2UgdGhpcyBmZWF0dXJlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIEBDb21wb25lbnQoe1xuICogICBzZWxlY3RvcjogJ215LWNvbXBvbmVudCcsXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPGRpdiBbQC5kaXNhYmxlZF09XCJpc0Rpc2FibGVkXCI+XG4gKiAgICAgICA8ZGl2IFtAY2hpbGRBbmltYXRpb25dPVwiZXhwXCI+PC9kaXY+XG4gKiAgICAgPC9kaXY+XG4gKiAgIGAsXG4gKiAgIGFuaW1hdGlvbnM6IFtcbiAqICAgICB0cmlnZ2VyKFwiY2hpbGRBbmltYXRpb25cIiwgW1xuICogICAgICAgLy8gLi4uXG4gKiAgICAgXSlcbiAqICAgXVxuICogfSlcbiAqIGNsYXNzIE15Q29tcG9uZW50IHtcbiAqICAgaXNEaXNhYmxlZCA9IHRydWU7XG4gKiAgIGV4cCA9ICcuLi4nO1xuICogfVxuICogYGBgXG4gKlxuICogV2hlbiBgQC5kaXNhYmxlZGAgaXMgdHJ1ZSwgaXQgcHJldmVudHMgdGhlIGBAY2hpbGRBbmltYXRpb25gIHRyaWdnZXIgZnJvbSBhbmltYXRpbmcsXG4gKiBhbG9uZyB3aXRoIGFueSBpbm5lciBhbmltYXRpb25zLlxuICpcbiAqICMjIyBEaXNhYmxlIGFuaW1hdGlvbnMgYXBwbGljYXRpb24td2lkZVxuICogV2hlbiBhbiBhcmVhIG9mIHRoZSB0ZW1wbGF0ZSBpcyBzZXQgdG8gaGF2ZSBhbmltYXRpb25zIGRpc2FibGVkLFxuICogKiphbGwqKiBpbm5lciBjb21wb25lbnRzIGhhdmUgdGhlaXIgYW5pbWF0aW9ucyBkaXNhYmxlZCBhcyB3ZWxsLlxuICogVGhpcyBtZWFucyB0aGF0IHlvdSBjYW4gZGlzYWJsZSBhbGwgYW5pbWF0aW9ucyBmb3IgYW4gYXBwXG4gKiBieSBwbGFjaW5nIGEgaG9zdCBiaW5kaW5nIHNldCBvbiBgQC5kaXNhYmxlZGAgb24gdGhlIHRvcG1vc3QgQW5ndWxhciBjb21wb25lbnQuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogaW1wb3J0IHtDb21wb25lbnQsIEhvc3RCaW5kaW5nfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdhcHAtY29tcG9uZW50JyxcbiAqICAgdGVtcGxhdGVVcmw6ICdhcHAuY29tcG9uZW50Lmh0bWwnLFxuICogfSlcbiAqIGNsYXNzIEFwcENvbXBvbmVudCB7XG4gKiAgIEBIb3N0QmluZGluZygnQC5kaXNhYmxlZCcpXG4gKiAgIHB1YmxpYyBhbmltYXRpb25zRGlzYWJsZWQgPSB0cnVlO1xuICogfVxuICogYGBgXG4gKlxuICogIyMjIE92ZXJyaWRpbmcgZGlzYWJsZW1lbnQgb2YgaW5uZXIgYW5pbWF0aW9uc1xuICogRGVzcGl0ZSBpbm5lciBhbmltYXRpb25zIGJlaW5nIGRpc2FibGVkLCBhIHBhcmVudCBhbmltYXRpb24gY2FuIGBxdWVyeSgpYFxuICogZm9yIGlubmVyIGVsZW1lbnRzIGxvY2F0ZWQgaW4gZGlzYWJsZWQgYXJlYXMgb2YgdGhlIHRlbXBsYXRlIGFuZCBzdGlsbCBhbmltYXRlXG4gKiB0aGVtIGlmIG5lZWRlZC4gVGhpcyBpcyBhbHNvIHRoZSBjYXNlIGZvciB3aGVuIGEgc3ViIGFuaW1hdGlvbiBpc1xuICogcXVlcmllZCBieSBhIHBhcmVudCBhbmQgdGhlbiBsYXRlciBhbmltYXRlZCB1c2luZyBgYW5pbWF0ZUNoaWxkKClgLlxuICpcbiAqICMjIyBEZXRlY3Rpbmcgd2hlbiBhbiBhbmltYXRpb24gaXMgZGlzYWJsZWRcbiAqIElmIGEgcmVnaW9uIG9mIHRoZSBET00gKG9yIHRoZSBlbnRpcmUgYXBwbGljYXRpb24pIGhhcyBpdHMgYW5pbWF0aW9ucyBkaXNhYmxlZCwgdGhlIGFuaW1hdGlvblxuICogdHJpZ2dlciBjYWxsYmFja3Mgc3RpbGwgZmlyZSwgYnV0IGZvciB6ZXJvIHNlY29uZHMuIFdoZW4gdGhlIGNhbGxiYWNrIGZpcmVzLCBpdCBwcm92aWRlc1xuICogYW4gaW5zdGFuY2Ugb2YgYW4gYEFuaW1hdGlvbkV2ZW50YC4gSWYgYW5pbWF0aW9ucyBhcmUgZGlzYWJsZWQsXG4gKiB0aGUgYC5kaXNhYmxlZGAgZmxhZyBvbiB0aGUgZXZlbnQgaXMgdHJ1ZS5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB0cmlnZ2VyKG5hbWU6IHN0cmluZywgZGVmaW5pdGlvbnM6IEFuaW1hdGlvbk1ldGFkYXRhW10pOiBBbmltYXRpb25UcmlnZ2VyTWV0YWRhdGEge1xuICByZXR1cm4ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5UcmlnZ2VyLCBuYW1lLCBkZWZpbml0aW9ucywgb3B0aW9uczoge319O1xufVxuXG4vKipcbiAqIERlZmluZXMgYW4gYW5pbWF0aW9uIHN0ZXAgdGhhdCBjb21iaW5lcyBzdHlsaW5nIGluZm9ybWF0aW9uIHdpdGggdGltaW5nIGluZm9ybWF0aW9uLlxuICpcbiAqIEBwYXJhbSB0aW1pbmdzIFNldHMgYEFuaW1hdGVUaW1pbmdzYCBmb3IgdGhlIHBhcmVudCBhbmltYXRpb24uXG4gKiBBIHN0cmluZyBpbiB0aGUgZm9ybWF0IFwiZHVyYXRpb24gW2RlbGF5XSBbZWFzaW5nXVwiLlxuICogIC0gRHVyYXRpb24gYW5kIGRlbGF5IGFyZSBleHByZXNzZWQgYXMgYSBudW1iZXIgYW5kIG9wdGlvbmFsIHRpbWUgdW5pdCxcbiAqIHN1Y2ggYXMgXCIxc1wiIG9yIFwiMTBtc1wiIGZvciBvbmUgc2Vjb25kIGFuZCAxMCBtaWxsaXNlY29uZHMsIHJlc3BlY3RpdmVseS5cbiAqIFRoZSBkZWZhdWx0IHVuaXQgaXMgbWlsbGlzZWNvbmRzLlxuICogIC0gVGhlIGVhc2luZyB2YWx1ZSBjb250cm9scyBob3cgdGhlIGFuaW1hdGlvbiBhY2NlbGVyYXRlcyBhbmQgZGVjZWxlcmF0ZXNcbiAqIGR1cmluZyBpdHMgcnVudGltZS4gVmFsdWUgaXMgb25lIG9mICBgZWFzZWAsIGBlYXNlLWluYCwgYGVhc2Utb3V0YCxcbiAqIGBlYXNlLWluLW91dGAsIG9yIGEgYGN1YmljLWJlemllcigpYCBmdW5jdGlvbiBjYWxsLlxuICogSWYgbm90IHN1cHBsaWVkLCBubyBlYXNpbmcgaXMgYXBwbGllZC5cbiAqXG4gKiBGb3IgZXhhbXBsZSwgdGhlIHN0cmluZyBcIjFzIDEwMG1zIGVhc2Utb3V0XCIgc3BlY2lmaWVzIGEgZHVyYXRpb24gb2ZcbiAqIDEwMDAgbWlsbGlzZWNvbmRzLCBhbmQgZGVsYXkgb2YgMTAwIG1zLCBhbmQgdGhlIFwiZWFzZS1vdXRcIiBlYXNpbmcgc3R5bGUsXG4gKiB3aGljaCBkZWNlbGVyYXRlcyBuZWFyIHRoZSBlbmQgb2YgdGhlIGR1cmF0aW9uLlxuICogQHBhcmFtIHN0eWxlcyBTZXRzIEFuaW1hdGlvblN0eWxlcyBmb3IgdGhlIHBhcmVudCBhbmltYXRpb24uXG4gKiBBIGZ1bmN0aW9uIGNhbGwgdG8gZWl0aGVyIGBzdHlsZSgpYCBvciBga2V5ZnJhbWVzKClgXG4gKiB0aGF0IHJldHVybnMgYSBjb2xsZWN0aW9uIG9mIENTUyBzdHlsZSBlbnRyaWVzIHRvIGJlIGFwcGxpZWQgdG8gdGhlIHBhcmVudCBhbmltYXRpb24uXG4gKiBXaGVuIG51bGwsIHVzZXMgdGhlIHN0eWxlcyBmcm9tIHRoZSBkZXN0aW5hdGlvbiBzdGF0ZS5cbiAqIFRoaXMgaXMgdXNlZnVsIHdoZW4gZGVzY3JpYmluZyBhbiBhbmltYXRpb24gc3RlcCB0aGF0IHdpbGwgY29tcGxldGUgYW4gYW5pbWF0aW9uO1xuICogc2VlIFwiQW5pbWF0aW5nIHRvIHRoZSBmaW5hbCBzdGF0ZVwiIGluIGB0cmFuc2l0aW9ucygpYC5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUgYW5pbWF0aW9uIHN0ZXAuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIENhbGwgd2l0aGluIGFuIGFuaW1hdGlvbiBgc2VxdWVuY2UoKWAsIGB7QGxpbmsgYW5pbWF0aW9ucy9ncm91cCBncm91cCgpfWAsIG9yXG4gKiBgdHJhbnNpdGlvbigpYCBjYWxsIHRvIHNwZWNpZnkgYW4gYW5pbWF0aW9uIHN0ZXBcbiAqIHRoYXQgYXBwbGllcyBnaXZlbiBzdHlsZSBkYXRhIHRvIHRoZSBwYXJlbnQgYW5pbWF0aW9uIGZvciBhIGdpdmVuIGFtb3VudCBvZiB0aW1lLlxuICpcbiAqICMjIyBTeW50YXggRXhhbXBsZXNcbiAqICoqVGltaW5nIGV4YW1wbGVzKipcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGVzIHNob3cgdmFyaW91cyBgdGltaW5nc2Agc3BlY2lmaWNhdGlvbnMuXG4gKiAtIGBhbmltYXRlKDUwMClgIDogRHVyYXRpb24gaXMgNTAwIG1pbGxpc2Vjb25kcy5cbiAqIC0gYGFuaW1hdGUoXCIxc1wiKWAgOiBEdXJhdGlvbiBpcyAxMDAwIG1pbGxpc2Vjb25kcy5cbiAqIC0gYGFuaW1hdGUoXCIxMDBtcyAwLjVzXCIpYCA6IER1cmF0aW9uIGlzIDEwMCBtaWxsaXNlY29uZHMsIGRlbGF5IGlzIDUwMCBtaWxsaXNlY29uZHMuXG4gKiAtIGBhbmltYXRlKFwiNXMgZWFzZS1pblwiKWAgOiBEdXJhdGlvbiBpcyA1MDAwIG1pbGxpc2Vjb25kcywgZWFzaW5nIGluLlxuICogLSBgYW5pbWF0ZShcIjVzIDEwbXMgY3ViaWMtYmV6aWVyKC4xNywuNjcsLjg4LC4xKVwiKWAgOiBEdXJhdGlvbiBpcyA1MDAwIG1pbGxpc2Vjb25kcywgZGVsYXkgaXMgMTBcbiAqIG1pbGxpc2Vjb25kcywgZWFzaW5nIGFjY29yZGluZyB0byBhIGJlemllciBjdXJ2ZS5cbiAqXG4gKiAqKlN0eWxlIGV4YW1wbGVzKipcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgY2FsbHMgYHN0eWxlKClgIHRvIHNldCBhIHNpbmdsZSBDU1Mgc3R5bGUuXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBhbmltYXRlKDUwMCwgc3R5bGUoeyBiYWNrZ3JvdW5kOiBcInJlZFwiIH0pKVxuICogYGBgXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgY2FsbHMgYGtleWZyYW1lcygpYCB0byBzZXQgYSBDU1Mgc3R5bGVcbiAqIHRvIGRpZmZlcmVudCB2YWx1ZXMgZm9yIHN1Y2Nlc3NpdmUga2V5ZnJhbWVzLlxuICogYGBgdHlwZXNjcmlwdFxuICogYW5pbWF0ZSg1MDAsIGtleWZyYW1lcyhcbiAqICBbXG4gKiAgIHN0eWxlKHsgYmFja2dyb3VuZDogXCJibHVlXCIgfSksXG4gKiAgIHN0eWxlKHsgYmFja2dyb3VuZDogXCJyZWRcIiB9KVxuICogIF0pXG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhbmltYXRlKFxuICAgIHRpbWluZ3M6IHN0cmluZ3xudW1iZXIsXG4gICAgc3R5bGVzOiBBbmltYXRpb25TdHlsZU1ldGFkYXRhfEFuaW1hdGlvbktleWZyYW1lc1NlcXVlbmNlTWV0YWRhdGF8bnVsbCA9XG4gICAgICAgIG51bGwpOiBBbmltYXRpb25BbmltYXRlTWV0YWRhdGEge1xuICByZXR1cm4ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5BbmltYXRlLCBzdHlsZXMsIHRpbWluZ3N9O1xufVxuXG4vKipcbiAqIEBkZXNjcmlwdGlvbiBEZWZpbmVzIGEgbGlzdCBvZiBhbmltYXRpb24gc3RlcHMgdG8gYmUgcnVuIGluIHBhcmFsbGVsLlxuICpcbiAqIEBwYXJhbSBzdGVwcyBBbiBhcnJheSBvZiBhbmltYXRpb24gc3RlcCBvYmplY3RzLlxuICogLSBXaGVuIHN0ZXBzIGFyZSBkZWZpbmVkIGJ5IGBzdHlsZSgpYCBvciBgYW5pbWF0ZSgpYFxuICogZnVuY3Rpb24gY2FsbHMsIGVhY2ggY2FsbCB3aXRoaW4gdGhlIGdyb3VwIGlzIGV4ZWN1dGVkIGluc3RhbnRseS5cbiAqIC0gVG8gc3BlY2lmeSBvZmZzZXQgc3R5bGVzIHRvIGJlIGFwcGxpZWQgYXQgYSBsYXRlciB0aW1lLCBkZWZpbmUgc3RlcHMgd2l0aFxuICogYGtleWZyYW1lcygpYCwgb3IgdXNlIGBhbmltYXRlKClgIGNhbGxzIHdpdGggYSBkZWxheSB2YWx1ZS5cbiAqIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIGdyb3VwKFtcbiAqICAgYW5pbWF0ZShcIjFzXCIsIHN0eWxlKHsgYmFja2dyb3VuZDogXCJibGFja1wiIH0pKSxcbiAqICAgYW5pbWF0ZShcIjJzXCIsIHN0eWxlKHsgY29sb3I6IFwid2hpdGVcIiB9KSlcbiAqIF0pXG4gKiBgYGBcbiAqXG4gKiBAcGFyYW0gb3B0aW9ucyBBbiBvcHRpb25zIG9iamVjdCBjb250YWluaW5nIGEgZGVsYXkgYW5kXG4gKiBkZXZlbG9wZXItZGVmaW5lZCBwYXJhbWV0ZXJzIHRoYXQgcHJvdmlkZSBzdHlsaW5nIGRlZmF1bHRzIGFuZFxuICogY2FuIGJlIG92ZXJyaWRkZW4gb24gaW52b2NhdGlvbi5cbiAqXG4gKiBAcmV0dXJuIEFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUgZ3JvdXAgZGF0YS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogR3JvdXBlZCBhbmltYXRpb25zIGFyZSB1c2VmdWwgd2hlbiBhIHNlcmllcyBvZiBzdHlsZXMgbXVzdCBiZVxuICogYW5pbWF0ZWQgYXQgZGlmZmVyZW50IHN0YXJ0aW5nIHRpbWVzIGFuZCBjbG9zZWQgb2ZmIGF0IGRpZmZlcmVudCBlbmRpbmcgdGltZXMuXG4gKlxuICogV2hlbiBjYWxsZWQgd2l0aGluIGEgYHNlcXVlbmNlKClgIG9yIGFcbiAqIGB0cmFuc2l0aW9uKClgIGNhbGwsIGRvZXMgbm90IGNvbnRpbnVlIHRvIHRoZSBuZXh0XG4gKiBpbnN0cnVjdGlvbiB1bnRpbCBhbGwgb2YgdGhlIGlubmVyIGFuaW1hdGlvbiBzdGVwcyBoYXZlIGNvbXBsZXRlZC5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBncm91cChcbiAgICBzdGVwczogQW5pbWF0aW9uTWV0YWRhdGFbXSwgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9uc3xudWxsID0gbnVsbCk6IEFuaW1hdGlvbkdyb3VwTWV0YWRhdGEge1xuICByZXR1cm4ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5Hcm91cCwgc3RlcHMsIG9wdGlvbnN9O1xufVxuXG4vKipcbiAqIERlZmluZXMgYSBsaXN0IG9mIGFuaW1hdGlvbiBzdGVwcyB0byBiZSBydW4gc2VxdWVudGlhbGx5LCBvbmUgYnkgb25lLlxuICpcbiAqIEBwYXJhbSBzdGVwcyBBbiBhcnJheSBvZiBhbmltYXRpb24gc3RlcCBvYmplY3RzLlxuICogLSBTdGVwcyBkZWZpbmVkIGJ5IGBzdHlsZSgpYCBjYWxscyBhcHBseSB0aGUgc3R5bGluZyBkYXRhIGltbWVkaWF0ZWx5LlxuICogLSBTdGVwcyBkZWZpbmVkIGJ5IGBhbmltYXRlKClgIGNhbGxzIGFwcGx5IHRoZSBzdHlsaW5nIGRhdGEgb3ZlciB0aW1lXG4gKiAgIGFzIHNwZWNpZmllZCBieSB0aGUgdGltaW5nIGRhdGEuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogc2VxdWVuY2UoW1xuICogICBzdHlsZSh7IG9wYWNpdHk6IDAgfSksXG4gKiAgIGFuaW1hdGUoXCIxc1wiLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpXG4gKiBdKVxuICogYGBgXG4gKlxuICogQHBhcmFtIG9wdGlvbnMgQW4gb3B0aW9ucyBvYmplY3QgY29udGFpbmluZyBhIGRlbGF5IGFuZFxuICogZGV2ZWxvcGVyLWRlZmluZWQgcGFyYW1ldGVycyB0aGF0IHByb3ZpZGUgc3R5bGluZyBkZWZhdWx0cyBhbmRcbiAqIGNhbiBiZSBvdmVycmlkZGVuIG9uIGludm9jYXRpb24uXG4gKlxuICogQHJldHVybiBBbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIHNlcXVlbmNlIGRhdGEuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIFdoZW4geW91IHBhc3MgYW4gYXJyYXkgb2Ygc3RlcHMgdG8gYVxuICogYHRyYW5zaXRpb24oKWAgY2FsbCwgdGhlIHN0ZXBzIHJ1biBzZXF1ZW50aWFsbHkgYnkgZGVmYXVsdC5cbiAqIENvbXBhcmUgdGhpcyB0byB0aGUgYHtAbGluayBhbmltYXRpb25zL2dyb3VwIGdyb3VwKCl9YCBjYWxsLCB3aGljaCBydW5zIGFuaW1hdGlvbiBzdGVwcyBpblxuICpwYXJhbGxlbC5cbiAqXG4gKiBXaGVuIGEgc2VxdWVuY2UgaXMgdXNlZCB3aXRoaW4gYSBge0BsaW5rIGFuaW1hdGlvbnMvZ3JvdXAgZ3JvdXAoKX1gIG9yIGEgYHRyYW5zaXRpb24oKWAgY2FsbCxcbiAqIGV4ZWN1dGlvbiBjb250aW51ZXMgdG8gdGhlIG5leHQgaW5zdHJ1Y3Rpb24gb25seSBhZnRlciBlYWNoIG9mIHRoZSBpbm5lciBhbmltYXRpb25cbiAqIHN0ZXBzIGhhdmUgY29tcGxldGVkLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqKi9cbmV4cG9ydCBmdW5jdGlvbiBzZXF1ZW5jZShcbiAgICBzdGVwczogQW5pbWF0aW9uTWV0YWRhdGFbXSwgb3B0aW9uczogQW5pbWF0aW9uT3B0aW9uc3xudWxsID0gbnVsbCk6IEFuaW1hdGlvblNlcXVlbmNlTWV0YWRhdGEge1xuICByZXR1cm4ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5TZXF1ZW5jZSwgc3RlcHMsIG9wdGlvbnN9O1xufVxuXG4vKipcbiAqIERlY2xhcmVzIGEga2V5L3ZhbHVlIG9iamVjdCBjb250YWluaW5nIENTUyBwcm9wZXJ0aWVzL3N0eWxlcyB0aGF0XG4gKiBjYW4gdGhlbiBiZSB1c2VkIGZvciBhbiBhbmltYXRpb24gYHN0YXRlYCwgd2l0aGluIGFuIGFuaW1hdGlvbiBgc2VxdWVuY2VgLFxuICogb3IgYXMgc3R5bGluZyBkYXRhIGZvciBjYWxscyB0byBgYW5pbWF0ZSgpYCBhbmQgYGtleWZyYW1lcygpYC5cbiAqXG4gKiBAcGFyYW0gdG9rZW5zIEEgc2V0IG9mIENTUyBzdHlsZXMgb3IgSFRNTCBzdHlsZXMgYXNzb2NpYXRlZCB3aXRoIGFuIGFuaW1hdGlvbiBzdGF0ZS5cbiAqIFRoZSB2YWx1ZSBjYW4gYmUgYW55IG9mIHRoZSBmb2xsb3dpbmc6XG4gKiAtIEEga2V5LXZhbHVlIHN0eWxlIHBhaXIgYXNzb2NpYXRpbmcgYSBDU1MgcHJvcGVydHkgd2l0aCBhIHZhbHVlLlxuICogLSBBbiBhcnJheSBvZiBrZXktdmFsdWUgc3R5bGUgcGFpcnMuXG4gKiAtIEFuIGFzdGVyaXNrICgqKSwgdG8gdXNlIGF1dG8tc3R5bGluZywgd2hlcmUgc3R5bGVzIGFyZSBkZXJpdmVkIGZyb20gdGhlIGVsZW1lbnRcbiAqIGJlaW5nIGFuaW1hdGVkIGFuZCBhcHBsaWVkIHRvIHRoZSBhbmltYXRpb24gd2hlbiBpdCBzdGFydHMuXG4gKlxuICogQXV0by1zdHlsaW5nIGNhbiBiZSB1c2VkIHRvIGRlZmluZSBhIHN0YXRlIHRoYXQgZGVwZW5kcyBvbiBsYXlvdXQgb3Igb3RoZXJcbiAqIGVudmlyb25tZW50YWwgZmFjdG9ycy5cbiAqXG4gKiBAcmV0dXJuIEFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUgc3R5bGUgZGF0YS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVGhlIGZvbGxvd2luZyBleGFtcGxlcyBjcmVhdGUgYW5pbWF0aW9uIHN0eWxlcyB0aGF0IGNvbGxlY3QgYSBzZXQgb2ZcbiAqIENTUyBwcm9wZXJ0eSB2YWx1ZXM6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogLy8gc3RyaW5nIHZhbHVlcyBmb3IgQ1NTIHByb3BlcnRpZXNcbiAqIHN0eWxlKHsgYmFja2dyb3VuZDogXCJyZWRcIiwgY29sb3I6IFwiYmx1ZVwiIH0pXG4gKlxuICogLy8gbnVtZXJpY2FsIHBpeGVsIHZhbHVlc1xuICogc3R5bGUoeyB3aWR0aDogMTAwLCBoZWlnaHQ6IDAgfSlcbiAqIGBgYFxuICpcbiAqIFRoZSBmb2xsb3dpbmcgZXhhbXBsZSB1c2VzIGF1dG8tc3R5bGluZyB0byBhbGxvdyBhbiBlbGVtZW50IHRvIGFuaW1hdGUgZnJvbVxuICogYSBoZWlnaHQgb2YgMCB1cCB0byBpdHMgZnVsbCBoZWlnaHQ6XG4gKlxuICogYGBgXG4gKiBzdHlsZSh7IGhlaWdodDogMCB9KSxcbiAqIGFuaW1hdGUoXCIxc1wiLCBzdHlsZSh7IGhlaWdodDogXCIqXCIgfSkpXG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKiovXG5leHBvcnQgZnVuY3Rpb24gc3R5bGUodG9rZW5zOiAnKid8e1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlcn18XG4gICAgICAgICAgICAgICAgICAgICAgQXJyYXk8JyonfHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXJ9Pik6IEFuaW1hdGlvblN0eWxlTWV0YWRhdGEge1xuICByZXR1cm4ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5TdHlsZSwgc3R5bGVzOiB0b2tlbnMsIG9mZnNldDogbnVsbH07XG59XG5cbi8qKlxuICogRGVjbGFyZXMgYW4gYW5pbWF0aW9uIHN0YXRlIHdpdGhpbiBhIHRyaWdnZXIgYXR0YWNoZWQgdG8gYW4gZWxlbWVudC5cbiAqXG4gKiBAcGFyYW0gbmFtZSBPbmUgb3IgbW9yZSBuYW1lcyBmb3IgdGhlIGRlZmluZWQgc3RhdGUgaW4gYSBjb21tYS1zZXBhcmF0ZWQgc3RyaW5nLlxuICogVGhlIGZvbGxvd2luZyByZXNlcnZlZCBzdGF0ZSBuYW1lcyBjYW4gYmUgc3VwcGxpZWQgdG8gZGVmaW5lIGEgc3R5bGUgZm9yIHNwZWNpZmljIHVzZVxuICogY2FzZXM6XG4gKlxuICogLSBgdm9pZGAgWW91IGNhbiBhc3NvY2lhdGUgc3R5bGVzIHdpdGggdGhpcyBuYW1lIHRvIGJlIHVzZWQgd2hlblxuICogdGhlIGVsZW1lbnQgaXMgZGV0YWNoZWQgZnJvbSB0aGUgYXBwbGljYXRpb24uIEZvciBleGFtcGxlLCB3aGVuIGFuIGBuZ0lmYCBldmFsdWF0ZXNcbiAqIHRvIGZhbHNlLCB0aGUgc3RhdGUgb2YgdGhlIGFzc29jaWF0ZWQgZWxlbWVudCBpcyB2b2lkLlxuICogIC0gYCpgIChhc3RlcmlzaykgSW5kaWNhdGVzIHRoZSBkZWZhdWx0IHN0YXRlLiBZb3UgY2FuIGFzc29jaWF0ZSBzdHlsZXMgd2l0aCB0aGlzIG5hbWVcbiAqIHRvIGJlIHVzZWQgYXMgdGhlIGZhbGxiYWNrIHdoZW4gdGhlIHN0YXRlIHRoYXQgaXMgYmVpbmcgYW5pbWF0ZWQgaXMgbm90IGRlY2xhcmVkXG4gKiB3aXRoaW4gdGhlIHRyaWdnZXIuXG4gKlxuICogQHBhcmFtIHN0eWxlcyBBIHNldCBvZiBDU1Mgc3R5bGVzIGFzc29jaWF0ZWQgd2l0aCB0aGlzIHN0YXRlLCBjcmVhdGVkIHVzaW5nIHRoZVxuICogYHN0eWxlKClgIGZ1bmN0aW9uLlxuICogVGhpcyBzZXQgb2Ygc3R5bGVzIHBlcnNpc3RzIG9uIHRoZSBlbGVtZW50IG9uY2UgdGhlIHN0YXRlIGhhcyBiZWVuIHJlYWNoZWQuXG4gKiBAcGFyYW0gb3B0aW9ucyBQYXJhbWV0ZXJzIHRoYXQgY2FuIGJlIHBhc3NlZCB0byB0aGUgc3RhdGUgd2hlbiBpdCBpcyBpbnZva2VkLlxuICogMCBvciBtb3JlIGtleS12YWx1ZSBwYWlycy5cbiAqIEByZXR1cm4gQW4gb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHRoZSBuZXcgc3RhdGUgZGF0YS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVXNlIHRoZSBgdHJpZ2dlcigpYCBmdW5jdGlvbiB0byByZWdpc3RlciBzdGF0ZXMgdG8gYW4gYW5pbWF0aW9uIHRyaWdnZXIuXG4gKiBVc2UgdGhlIGB0cmFuc2l0aW9uKClgIGZ1bmN0aW9uIHRvIGFuaW1hdGUgYmV0d2VlbiBzdGF0ZXMuXG4gKiBXaGVuIGEgc3RhdGUgaXMgYWN0aXZlIHdpdGhpbiBhIGNvbXBvbmVudCwgaXRzIGFzc29jaWF0ZWQgc3R5bGVzIHBlcnNpc3Qgb24gdGhlIGVsZW1lbnQsXG4gKiBldmVuIHdoZW4gdGhlIGFuaW1hdGlvbiBlbmRzLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqKi9cbmV4cG9ydCBmdW5jdGlvbiBzdGF0ZShcbiAgICBuYW1lOiBzdHJpbmcsIHN0eWxlczogQW5pbWF0aW9uU3R5bGVNZXRhZGF0YSxcbiAgICBvcHRpb25zPzoge3BhcmFtczoge1tuYW1lOiBzdHJpbmddOiBhbnl9fSk6IEFuaW1hdGlvblN0YXRlTWV0YWRhdGEge1xuICByZXR1cm4ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5TdGF0ZSwgbmFtZSwgc3R5bGVzLCBvcHRpb25zfTtcbn1cblxuLyoqXG4gKiBEZWZpbmVzIGEgc2V0IG9mIGFuaW1hdGlvbiBzdHlsZXMsIGFzc29jaWF0aW5nIGVhY2ggc3R5bGUgd2l0aCBhbiBvcHRpb25hbCBgb2Zmc2V0YCB2YWx1ZS5cbiAqXG4gKiBAcGFyYW0gc3RlcHMgQSBzZXQgb2YgYW5pbWF0aW9uIHN0eWxlcyB3aXRoIG9wdGlvbmFsIG9mZnNldCBkYXRhLlxuICogVGhlIG9wdGlvbmFsIGBvZmZzZXRgIHZhbHVlIGZvciBhIHN0eWxlIHNwZWNpZmllcyBhIHBlcmNlbnRhZ2Ugb2YgdGhlIHRvdGFsIGFuaW1hdGlvblxuICogdGltZSBhdCB3aGljaCB0aGF0IHN0eWxlIGlzIGFwcGxpZWQuXG4gKiBAcmV0dXJucyBBbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIGtleWZyYW1lcyBkYXRhLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBVc2Ugd2l0aCB0aGUgYGFuaW1hdGUoKWAgY2FsbC4gSW5zdGVhZCBvZiBhcHBseWluZyBhbmltYXRpb25zXG4gKiBmcm9tIHRoZSBjdXJyZW50IHN0YXRlXG4gKiB0byB0aGUgZGVzdGluYXRpb24gc3RhdGUsIGtleWZyYW1lcyBkZXNjcmliZSBob3cgZWFjaCBzdHlsZSBlbnRyeSBpcyBhcHBsaWVkIGFuZCBhdCB3aGF0IHBvaW50XG4gKiB3aXRoaW4gdGhlIGFuaW1hdGlvbiBhcmMuXG4gKiBDb21wYXJlIFtDU1MgS2V5ZnJhbWUgQW5pbWF0aW9uc10oaHR0cHM6Ly93d3cudzNzY2hvb2xzLmNvbS9jc3MvY3NzM19hbmltYXRpb25zLmFzcCkuXG4gKlxuICogIyMjIFVzYWdlXG4gKlxuICogSW4gdGhlIGZvbGxvd2luZyBleGFtcGxlLCB0aGUgb2Zmc2V0IHZhbHVlcyBkZXNjcmliZVxuICogd2hlbiBlYWNoIGBiYWNrZ3JvdW5kQ29sb3JgIHZhbHVlIGlzIGFwcGxpZWQuIFRoZSBjb2xvciBpcyByZWQgYXQgdGhlIHN0YXJ0LCBhbmQgY2hhbmdlcyB0b1xuICogYmx1ZSB3aGVuIDIwJSBvZiB0aGUgdG90YWwgdGltZSBoYXMgZWxhcHNlZC5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiAvLyB0aGUgcHJvdmlkZWQgb2Zmc2V0IHZhbHVlc1xuICogYW5pbWF0ZShcIjVzXCIsIGtleWZyYW1lcyhbXG4gKiAgIHN0eWxlKHsgYmFja2dyb3VuZENvbG9yOiBcInJlZFwiLCBvZmZzZXQ6IDAgfSksXG4gKiAgIHN0eWxlKHsgYmFja2dyb3VuZENvbG9yOiBcImJsdWVcIiwgb2Zmc2V0OiAwLjIgfSksXG4gKiAgIHN0eWxlKHsgYmFja2dyb3VuZENvbG9yOiBcIm9yYW5nZVwiLCBvZmZzZXQ6IDAuMyB9KSxcbiAqICAgc3R5bGUoeyBiYWNrZ3JvdW5kQ29sb3I6IFwiYmxhY2tcIiwgb2Zmc2V0OiAxIH0pXG4gKiBdKSlcbiAqIGBgYFxuICpcbiAqIElmIHRoZXJlIGFyZSBubyBgb2Zmc2V0YCB2YWx1ZXMgc3BlY2lmaWVkIGluIHRoZSBzdHlsZSBlbnRyaWVzLCB0aGUgb2Zmc2V0c1xuICogYXJlIGNhbGN1bGF0ZWQgYXV0b21hdGljYWxseS5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBhbmltYXRlKFwiNXNcIiwga2V5ZnJhbWVzKFtcbiAqICAgc3R5bGUoeyBiYWNrZ3JvdW5kQ29sb3I6IFwicmVkXCIgfSkgLy8gb2Zmc2V0ID0gMFxuICogICBzdHlsZSh7IGJhY2tncm91bmRDb2xvcjogXCJibHVlXCIgfSkgLy8gb2Zmc2V0ID0gMC4zM1xuICogICBzdHlsZSh7IGJhY2tncm91bmRDb2xvcjogXCJvcmFuZ2VcIiB9KSAvLyBvZmZzZXQgPSAwLjY2XG4gKiAgIHN0eWxlKHsgYmFja2dyb3VuZENvbG9yOiBcImJsYWNrXCIgfSkgLy8gb2Zmc2V0ID0gMVxuICogXSkpXG4gKmBgYFxuXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBrZXlmcmFtZXMoc3RlcHM6IEFuaW1hdGlvblN0eWxlTWV0YWRhdGFbXSk6IEFuaW1hdGlvbktleWZyYW1lc1NlcXVlbmNlTWV0YWRhdGEge1xuICByZXR1cm4ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5LZXlmcmFtZXMsIHN0ZXBzfTtcbn1cblxuLyoqXG4gKiBEZWNsYXJlcyBhbiBhbmltYXRpb24gdHJhbnNpdGlvbiBhcyBhIHNlcXVlbmNlIG9mIGFuaW1hdGlvbiBzdGVwcyB0byBydW4gd2hlbiBhIGdpdmVuXG4gKiBjb25kaXRpb24gaXMgc2F0aXNmaWVkLiBUaGUgY29uZGl0aW9uIGlzIGEgQm9vbGVhbiBleHByZXNzaW9uIG9yIGZ1bmN0aW9uIHRoYXQgY29tcGFyZXNcbiAqIHRoZSBwcmV2aW91cyBhbmQgY3VycmVudCBhbmltYXRpb24gc3RhdGVzLCBhbmQgcmV0dXJucyB0cnVlIGlmIHRoaXMgdHJhbnNpdGlvbiBzaG91bGQgb2NjdXIuXG4gKiBXaGVuIHRoZSBzdGF0ZSBjcml0ZXJpYSBvZiBhIGRlZmluZWQgdHJhbnNpdGlvbiBhcmUgbWV0LCB0aGUgYXNzb2NpYXRlZCBhbmltYXRpb24gaXNcbiAqIHRyaWdnZXJlZC5cbiAqXG4gKiBAcGFyYW0gc3RhdGVDaGFuZ2VFeHByIEEgQm9vbGVhbiBleHByZXNzaW9uIG9yIGZ1bmN0aW9uIHRoYXQgY29tcGFyZXMgdGhlIHByZXZpb3VzIGFuZCBjdXJyZW50XG4gKiBhbmltYXRpb24gc3RhdGVzLCBhbmQgcmV0dXJucyB0cnVlIGlmIHRoaXMgdHJhbnNpdGlvbiBzaG91bGQgb2NjdXIuIE5vdGUgdGhhdCAgXCJ0cnVlXCIgYW5kIFwiZmFsc2VcIlxuICogbWF0Y2ggMSBhbmQgMCwgcmVzcGVjdGl2ZWx5LiBBbiBleHByZXNzaW9uIGlzIGV2YWx1YXRlZCBlYWNoIHRpbWUgYSBzdGF0ZSBjaGFuZ2Ugb2NjdXJzIGluIHRoZVxuICogYW5pbWF0aW9uIHRyaWdnZXIgZWxlbWVudC5cbiAqIFRoZSBhbmltYXRpb24gc3RlcHMgcnVuIHdoZW4gdGhlIGV4cHJlc3Npb24gZXZhbHVhdGVzIHRvIHRydWUuXG4gKlxuICogLSBBIHN0YXRlLWNoYW5nZSBzdHJpbmcgdGFrZXMgdGhlIGZvcm0gXCJzdGF0ZTEgPT4gc3RhdGUyXCIsIHdoZXJlIGVhY2ggc2lkZSBpcyBhIGRlZmluZWQgYW5pbWF0aW9uXG4gKiBzdGF0ZSwgb3IgYW4gYXN0ZXJpc2sgKCopIHRvIHJlZmVyIHRvIGEgZHluYW1pYyBzdGFydCBvciBlbmQgc3RhdGUuXG4gKiAgIC0gVGhlIGV4cHJlc3Npb24gc3RyaW5nIGNhbiBjb250YWluIG11bHRpcGxlIGNvbW1hLXNlcGFyYXRlZCBzdGF0ZW1lbnRzO1xuICogZm9yIGV4YW1wbGUgXCJzdGF0ZTEgPT4gc3RhdGUyLCBzdGF0ZTMgPT4gc3RhdGU0XCIuXG4gKiAgIC0gU3BlY2lhbCB2YWx1ZXMgYDplbnRlcmAgYW5kIGA6bGVhdmVgIGluaXRpYXRlIGEgdHJhbnNpdGlvbiBvbiB0aGUgZW50cnkgYW5kIGV4aXQgc3RhdGVzLFxuICogZXF1aXZhbGVudCB0byAgXCJ2b2lkID0+ICpcIiAgYW5kIFwiKiA9PiB2b2lkXCIuXG4gKiAgIC0gU3BlY2lhbCB2YWx1ZXMgYDppbmNyZW1lbnRgIGFuZCBgOmRlY3JlbWVudGAgaW5pdGlhdGUgYSB0cmFuc2l0aW9uIHdoZW4gYSBudW1lcmljIHZhbHVlIGhhc1xuICogaW5jcmVhc2VkIG9yIGRlY3JlYXNlZCBpbiB2YWx1ZS5cbiAqIC0gQSBmdW5jdGlvbiBpcyBleGVjdXRlZCBlYWNoIHRpbWUgYSBzdGF0ZSBjaGFuZ2Ugb2NjdXJzIGluIHRoZSBhbmltYXRpb24gdHJpZ2dlciBlbGVtZW50LlxuICogVGhlIGFuaW1hdGlvbiBzdGVwcyBydW4gd2hlbiB0aGUgZnVuY3Rpb24gcmV0dXJucyB0cnVlLlxuICpcbiAqIEBwYXJhbSBzdGVwcyBPbmUgb3IgbW9yZSBhbmltYXRpb24gb2JqZWN0cywgYXMgcmV0dXJuZWQgYnkgdGhlIGBhbmltYXRlKClgIG9yXG4gKiBgc2VxdWVuY2UoKWAgZnVuY3Rpb24sIHRoYXQgZm9ybSBhIHRyYW5zZm9ybWF0aW9uIGZyb20gb25lIHN0YXRlIHRvIGFub3RoZXIuXG4gKiBBIHNlcXVlbmNlIGlzIHVzZWQgYnkgZGVmYXVsdCB3aGVuIHlvdSBwYXNzIGFuIGFycmF5LlxuICogQHBhcmFtIG9wdGlvbnMgQW4gb3B0aW9ucyBvYmplY3QgdGhhdCBjYW4gY29udGFpbiBhIGRlbGF5IHZhbHVlIGZvciB0aGUgc3RhcnQgb2YgdGhlIGFuaW1hdGlvbixcbiAqIGFuZCBhZGRpdGlvbmFsIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMuIFByb3ZpZGVkIHZhbHVlcyBmb3IgYWRkaXRpb25hbCBwYXJhbWV0ZXJzIGFyZSB1c2VkXG4gKiBhcyBkZWZhdWx0cywgYW5kIG92ZXJyaWRlIHZhbHVlcyBjYW4gYmUgcGFzc2VkIHRvIHRoZSBjYWxsZXIgb24gaW52b2NhdGlvbi5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUgdHJhbnNpdGlvbiBkYXRhLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBUaGUgdGVtcGxhdGUgYXNzb2NpYXRlZCB3aXRoIGEgY29tcG9uZW50IGJpbmRzIGFuIGFuaW1hdGlvbiB0cmlnZ2VyIHRvIGFuIGVsZW1lbnQuXG4gKlxuICogYGBgSFRNTFxuICogPCEtLSBzb21ld2hlcmUgaW5zaWRlIG9mIG15LWNvbXBvbmVudC10cGwuaHRtbCAtLT5cbiAqIDxkaXYgW0BteUFuaW1hdGlvblRyaWdnZXJdPVwibXlTdGF0dXNFeHBcIj4uLi48L2Rpdj5cbiAqIGBgYFxuICpcbiAqIEFsbCB0cmFuc2l0aW9ucyBhcmUgZGVmaW5lZCB3aXRoaW4gYW4gYW5pbWF0aW9uIHRyaWdnZXIsXG4gKiBhbG9uZyB3aXRoIG5hbWVkIHN0YXRlcyB0aGF0IHRoZSB0cmFuc2l0aW9ucyBjaGFuZ2UgdG8gYW5kIGZyb20uXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogdHJpZ2dlcihcIm15QW5pbWF0aW9uVHJpZ2dlclwiLCBbXG4gKiAgLy8gZGVmaW5lIHN0YXRlc1xuICogIHN0YXRlKFwib25cIiwgc3R5bGUoeyBiYWNrZ3JvdW5kOiBcImdyZWVuXCIgfSkpLFxuICogIHN0YXRlKFwib2ZmXCIsIHN0eWxlKHsgYmFja2dyb3VuZDogXCJncmV5XCIgfSkpLFxuICogIC4uLl1cbiAqIGBgYFxuICpcbiAqIE5vdGUgdGhhdCB3aGVuIHlvdSBjYWxsIHRoZSBgc2VxdWVuY2UoKWAgZnVuY3Rpb24gd2l0aGluIGEgYHtAbGluayBhbmltYXRpb25zL2dyb3VwIGdyb3VwKCl9YFxuICogb3IgYSBgdHJhbnNpdGlvbigpYCBjYWxsLCBleGVjdXRpb24gZG9lcyBub3QgY29udGludWUgdG8gdGhlIG5leHQgaW5zdHJ1Y3Rpb25cbiAqIHVudGlsIGVhY2ggb2YgdGhlIGlubmVyIGFuaW1hdGlvbiBzdGVwcyBoYXZlIGNvbXBsZXRlZC5cbiAqXG4gKiAjIyMgU3ludGF4IGV4YW1wbGVzXG4gKlxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlcyBkZWZpbmUgdHJhbnNpdGlvbnMgYmV0d2VlbiB0aGUgdHdvIGRlZmluZWQgc3RhdGVzIChhbmQgZGVmYXVsdCBzdGF0ZXMpLFxuICogdXNpbmcgdmFyaW91cyBvcHRpb25zOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIC8vIFRyYW5zaXRpb24gb2NjdXJzIHdoZW4gdGhlIHN0YXRlIHZhbHVlXG4gKiAvLyBib3VuZCB0byBcIm15QW5pbWF0aW9uVHJpZ2dlclwiIGNoYW5nZXMgZnJvbSBcIm9uXCIgdG8gXCJvZmZcIlxuICogdHJhbnNpdGlvbihcIm9uID0+IG9mZlwiLCBhbmltYXRlKDUwMCkpXG4gKiAvLyBSdW4gdGhlIHNhbWUgYW5pbWF0aW9uIGZvciBib3RoIGRpcmVjdGlvbnNcbiAqIHRyYW5zaXRpb24oXCJvbiA8PT4gb2ZmXCIsIGFuaW1hdGUoNTAwKSlcbiAqIC8vIERlZmluZSBtdWx0aXBsZSBzdGF0ZS1jaGFuZ2UgcGFpcnMgc2VwYXJhdGVkIGJ5IGNvbW1hc1xuICogdHJhbnNpdGlvbihcIm9uID0+IG9mZiwgb2ZmID0+IHZvaWRcIiwgYW5pbWF0ZSg1MDApKVxuICogYGBgXG4gKlxuICogIyMjIFNwZWNpYWwgdmFsdWVzIGZvciBzdGF0ZS1jaGFuZ2UgZXhwcmVzc2lvbnNcbiAqXG4gKiAtIENhdGNoLWFsbCBzdGF0ZSBjaGFuZ2UgZm9yIHdoZW4gYW4gZWxlbWVudCBpcyBpbnNlcnRlZCBpbnRvIHRoZSBwYWdlIGFuZCB0aGVcbiAqIGRlc3RpbmF0aW9uIHN0YXRlIGlzIHVua25vd246XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogdHJhbnNpdGlvbihcInZvaWQgPT4gKlwiLCBbXG4gKiAgc3R5bGUoeyBvcGFjaXR5OiAwIH0pLFxuICogIGFuaW1hdGUoNTAwKVxuICogIF0pXG4gKiBgYGBcbiAqXG4gKiAtIENhcHR1cmUgYSBzdGF0ZSBjaGFuZ2UgYmV0d2VlbiBhbnkgc3RhdGVzOlxuICpcbiAqICBgdHJhbnNpdGlvbihcIiogPT4gKlwiLCBhbmltYXRlKFwiMXMgMHNcIikpYFxuICpcbiAqIC0gRW50cnkgYW5kIGV4aXQgdHJhbnNpdGlvbnM6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogdHJhbnNpdGlvbihcIjplbnRlclwiLCBbXG4gKiAgIHN0eWxlKHsgb3BhY2l0eTogMCB9KSxcbiAqICAgYW5pbWF0ZSg1MDAsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSlcbiAqICAgXSksXG4gKiB0cmFuc2l0aW9uKFwiOmxlYXZlXCIsIFtcbiAqICAgYW5pbWF0ZSg1MDAsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSlcbiAqICAgXSlcbiAqIGBgYFxuICpcbiAqIC0gVXNlIGA6aW5jcmVtZW50YCBhbmQgYDpkZWNyZW1lbnRgIHRvIGluaXRpYXRlIHRyYW5zaXRpb25zOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIHRyYW5zaXRpb24oXCI6aW5jcmVtZW50XCIsIGdyb3VwKFtcbiAqICBxdWVyeSgnOmVudGVyJywgW1xuICogICAgIHN0eWxlKHsgbGVmdDogJzEwMCUnIH0pLFxuICogICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1vdXQnLCBzdHlsZSgnKicpKVxuICogICBdKSxcbiAqICBxdWVyeSgnOmxlYXZlJywgW1xuICogICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1vdXQnLCBzdHlsZSh7IGxlZnQ6ICctMTAwJScgfSkpXG4gKiAgXSlcbiAqIF0pKVxuICpcbiAqIHRyYW5zaXRpb24oXCI6ZGVjcmVtZW50XCIsIGdyb3VwKFtcbiAqICBxdWVyeSgnOmVudGVyJywgW1xuICogICAgIHN0eWxlKHsgbGVmdDogJzEwMCUnIH0pLFxuICogICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1vdXQnLCBzdHlsZSgnKicpKVxuICogICBdKSxcbiAqICBxdWVyeSgnOmxlYXZlJywgW1xuICogICAgIGFuaW1hdGUoJzAuNXMgZWFzZS1vdXQnLCBzdHlsZSh7IGxlZnQ6ICctMTAwJScgfSkpXG4gKiAgXSlcbiAqIF0pKVxuICogYGBgXG4gKlxuICogIyMjIFN0YXRlLWNoYW5nZSBmdW5jdGlvbnNcbiAqXG4gKiBIZXJlIGlzIGFuIGV4YW1wbGUgb2YgYSBgZnJvbVN0YXRlYCBzcGVjaWZpZWQgYXMgYSBzdGF0ZS1jaGFuZ2UgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGFuXG4gKiBhbmltYXRpb24gd2hlbiB0cnVlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqIHRyYW5zaXRpb24oKGZyb21TdGF0ZSwgdG9TdGF0ZSkgPT5cbiAqICB7XG4gKiAgIHJldHVybiBmcm9tU3RhdGUgPT0gXCJvZmZcIiAmJiB0b1N0YXRlID09IFwib25cIjtcbiAqICB9LFxuICogIGFuaW1hdGUoXCIxcyAwc1wiKSlcbiAqIGBgYFxuICpcbiAqICMjIyBBbmltYXRpbmcgdG8gdGhlIGZpbmFsIHN0YXRlXG4gKlxuICogSWYgdGhlIGZpbmFsIHN0ZXAgaW4gYSB0cmFuc2l0aW9uIGlzIGEgY2FsbCB0byBgYW5pbWF0ZSgpYCB0aGF0IHVzZXMgYSB0aW1pbmcgdmFsdWVcbiAqIHdpdGggbm8gc3R5bGUgZGF0YSwgdGhhdCBzdGVwIGlzIGF1dG9tYXRpY2FsbHkgY29uc2lkZXJlZCB0aGUgZmluYWwgYW5pbWF0aW9uIGFyYyxcbiAqIGZvciB0aGUgZWxlbWVudCB0byByZWFjaCB0aGUgZmluYWwgc3RhdGUuIEFuZ3VsYXIgYXV0b21hdGljYWxseSBhZGRzIG9yIHJlbW92ZXNcbiAqIENTUyBzdHlsZXMgdG8gZW5zdXJlIHRoYXQgdGhlIGVsZW1lbnQgaXMgaW4gdGhlIGNvcnJlY3QgZmluYWwgc3RhdGUuXG4gKlxuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIGRlZmluZXMgYSB0cmFuc2l0aW9uIHRoYXQgc3RhcnRzIGJ5IGhpZGluZyB0aGUgZWxlbWVudCxcbiAqIHRoZW4gbWFrZXMgc3VyZSB0aGF0IGl0IGFuaW1hdGVzIHByb3Blcmx5IHRvIHdoYXRldmVyIHN0YXRlIGlzIGN1cnJlbnRseSBhY3RpdmUgZm9yIHRyaWdnZXI6XG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogdHJhbnNpdGlvbihcInZvaWQgPT4gKlwiLCBbXG4gKiAgIHN0eWxlKHsgb3BhY2l0eTogMCB9KSxcbiAqICAgYW5pbWF0ZSg1MDApXG4gKiAgXSlcbiAqIGBgYFxuICogIyMjIEJvb2xlYW4gdmFsdWUgbWF0Y2hpbmdcbiAqIElmIGEgdHJpZ2dlciBiaW5kaW5nIHZhbHVlIGlzIGEgQm9vbGVhbiwgaXQgY2FuIGJlIG1hdGNoZWQgdXNpbmcgYSB0cmFuc2l0aW9uIGV4cHJlc3Npb25cbiAqIHRoYXQgY29tcGFyZXMgdHJ1ZSBhbmQgZmFsc2Ugb3IgMSBhbmQgMC4gRm9yIGV4YW1wbGU6XG4gKlxuICogYGBgXG4gKiAvLyBpbiB0aGUgdGVtcGxhdGVcbiAqIDxkaXYgW0BvcGVuQ2xvc2VdPVwib3BlbiA/IHRydWUgOiBmYWxzZVwiPi4uLjwvZGl2PlxuICogLy8gaW4gdGhlIGNvbXBvbmVudCBtZXRhZGF0YVxuICogdHJpZ2dlcignb3BlbkNsb3NlJywgW1xuICogICBzdGF0ZSgndHJ1ZScsIHN0eWxlKHsgaGVpZ2h0OiAnKicgfSkpLFxuICogICBzdGF0ZSgnZmFsc2UnLCBzdHlsZSh7IGhlaWdodDogJzBweCcgfSkpLFxuICogICB0cmFuc2l0aW9uKCdmYWxzZSA8PT4gdHJ1ZScsIGFuaW1hdGUoNTAwKSlcbiAqIF0pXG4gKiBgYGBcbiAqXG4gKiBAcHVibGljQXBpXG4gKiovXG5leHBvcnQgZnVuY3Rpb24gdHJhbnNpdGlvbihcbiAgICBzdGF0ZUNoYW5nZUV4cHI6IHN0cmluZ3xcbiAgICAoKGZyb21TdGF0ZTogc3RyaW5nLCB0b1N0YXRlOiBzdHJpbmcsIGVsZW1lbnQ/OiBhbnksIHBhcmFtcz86IHtba2V5OiBzdHJpbmddOiBhbnl9KSA9PiBib29sZWFuKSxcbiAgICBzdGVwczogQW5pbWF0aW9uTWV0YWRhdGF8QW5pbWF0aW9uTWV0YWRhdGFbXSxcbiAgICBvcHRpb25zOiBBbmltYXRpb25PcHRpb25zfG51bGwgPSBudWxsKTogQW5pbWF0aW9uVHJhbnNpdGlvbk1ldGFkYXRhIHtcbiAgcmV0dXJuIHt0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuVHJhbnNpdGlvbiwgZXhwcjogc3RhdGVDaGFuZ2VFeHByLCBhbmltYXRpb246IHN0ZXBzLCBvcHRpb25zfTtcbn1cblxuLyoqXG4gKiBQcm9kdWNlcyBhIHJldXNhYmxlIGFuaW1hdGlvbiB0aGF0IGNhbiBiZSBpbnZva2VkIGluIGFub3RoZXIgYW5pbWF0aW9uIG9yIHNlcXVlbmNlLFxuICogYnkgY2FsbGluZyB0aGUgYHVzZUFuaW1hdGlvbigpYCBmdW5jdGlvbi5cbiAqXG4gKiBAcGFyYW0gc3RlcHMgT25lIG9yIG1vcmUgYW5pbWF0aW9uIG9iamVjdHMsIGFzIHJldHVybmVkIGJ5IHRoZSBgYW5pbWF0ZSgpYFxuICogb3IgYHNlcXVlbmNlKClgIGZ1bmN0aW9uLCB0aGF0IGZvcm0gYSB0cmFuc2Zvcm1hdGlvbiBmcm9tIG9uZSBzdGF0ZSB0byBhbm90aGVyLlxuICogQSBzZXF1ZW5jZSBpcyB1c2VkIGJ5IGRlZmF1bHQgd2hlbiB5b3UgcGFzcyBhbiBhcnJheS5cbiAqIEBwYXJhbSBvcHRpb25zIEFuIG9wdGlvbnMgb2JqZWN0IHRoYXQgY2FuIGNvbnRhaW4gYSBkZWxheSB2YWx1ZSBmb3IgdGhlIHN0YXJ0IG9mIHRoZVxuICogYW5pbWF0aW9uLCBhbmQgYWRkaXRpb25hbCBkZXZlbG9wZXItZGVmaW5lZCBwYXJhbWV0ZXJzLlxuICogUHJvdmlkZWQgdmFsdWVzIGZvciBhZGRpdGlvbmFsIHBhcmFtZXRlcnMgYXJlIHVzZWQgYXMgZGVmYXVsdHMsXG4gKiBhbmQgb3ZlcnJpZGUgdmFsdWVzIGNhbiBiZSBwYXNzZWQgdG8gdGhlIGNhbGxlciBvbiBpbnZvY2F0aW9uLlxuICogQHJldHVybnMgQW4gb2JqZWN0IHRoYXQgZW5jYXBzdWxhdGVzIHRoZSBhbmltYXRpb24gZGF0YS5cbiAqXG4gKiBAdXNhZ2VOb3Rlc1xuICogVGhlIGZvbGxvd2luZyBleGFtcGxlIGRlZmluZXMgYSByZXVzYWJsZSBhbmltYXRpb24sIHByb3ZpZGluZyBzb21lIGRlZmF1bHQgcGFyYW1ldGVyXG4gKiB2YWx1ZXMuXG4gKlxuICogYGBgdHlwZXNjcmlwdFxuICogdmFyIGZhZGVBbmltYXRpb24gPSBhbmltYXRpb24oW1xuICogICBzdHlsZSh7IG9wYWNpdHk6ICd7eyBzdGFydCB9fScgfSksXG4gKiAgIGFuaW1hdGUoJ3t7IHRpbWUgfX0nLFxuICogICBzdHlsZSh7IG9wYWNpdHk6ICd7eyBlbmQgfX0nfSkpXG4gKiAgIF0sXG4gKiAgIHsgcGFyYW1zOiB7IHRpbWU6ICcxMDAwbXMnLCBzdGFydDogMCwgZW5kOiAxIH19KTtcbiAqIGBgYFxuICpcbiAqIFRoZSBmb2xsb3dpbmcgaW52b2tlcyB0aGUgZGVmaW5lZCBhbmltYXRpb24gd2l0aCBhIGNhbGwgdG8gYHVzZUFuaW1hdGlvbigpYCxcbiAqIHBhc3NpbmcgaW4gb3ZlcnJpZGUgcGFyYW1ldGVyIHZhbHVlcy5cbiAqXG4gKiBgYGBqc1xuICogdXNlQW5pbWF0aW9uKGZhZGVBbmltYXRpb24sIHtcbiAqICAgcGFyYW1zOiB7XG4gKiAgICAgdGltZTogJzJzJyxcbiAqICAgICBzdGFydDogMSxcbiAqICAgICBlbmQ6IDBcbiAqICAgfVxuICogfSlcbiAqIGBgYFxuICpcbiAqIElmIGFueSBvZiB0aGUgcGFzc2VkLWluIHBhcmFtZXRlciB2YWx1ZXMgYXJlIG1pc3NpbmcgZnJvbSB0aGlzIGNhbGwsXG4gKiB0aGUgZGVmYXVsdCB2YWx1ZXMgYXJlIHVzZWQuIElmIG9uZSBvciBtb3JlIHBhcmFtZXRlciB2YWx1ZXMgYXJlIG1pc3NpbmcgYmVmb3JlIGEgc3RlcCBpc1xuICogYW5pbWF0ZWQsIGB1c2VBbmltYXRpb24oKWAgdGhyb3dzIGFuIGVycm9yLlxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGFuaW1hdGlvbihcbiAgICBzdGVwczogQW5pbWF0aW9uTWV0YWRhdGF8QW5pbWF0aW9uTWV0YWRhdGFbXSxcbiAgICBvcHRpb25zOiBBbmltYXRpb25PcHRpb25zfG51bGwgPSBudWxsKTogQW5pbWF0aW9uUmVmZXJlbmNlTWV0YWRhdGEge1xuICByZXR1cm4ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5SZWZlcmVuY2UsIGFuaW1hdGlvbjogc3RlcHMsIG9wdGlvbnN9O1xufVxuXG4vKipcbiAqIEV4ZWN1dGVzIGEgcXVlcmllZCBpbm5lciBhbmltYXRpb24gZWxlbWVudCB3aXRoaW4gYW4gYW5pbWF0aW9uIHNlcXVlbmNlLlxuICpcbiAqIEBwYXJhbSBvcHRpb25zIEFuIG9wdGlvbnMgb2JqZWN0IHRoYXQgY2FuIGNvbnRhaW4gYSBkZWxheSB2YWx1ZSBmb3IgdGhlIHN0YXJ0IG9mIHRoZVxuICogYW5pbWF0aW9uLCBhbmQgYWRkaXRpb25hbCBvdmVycmlkZSB2YWx1ZXMgZm9yIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMuXG4gKiBAcmV0dXJuIEFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUgY2hpbGQgYW5pbWF0aW9uIGRhdGEuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIEVhY2ggdGltZSBhbiBhbmltYXRpb24gaXMgdHJpZ2dlcmVkIGluIEFuZ3VsYXIsIHRoZSBwYXJlbnQgYW5pbWF0aW9uXG4gKiBoYXMgcHJpb3JpdHkgYW5kIGFueSBjaGlsZCBhbmltYXRpb25zIGFyZSBibG9ja2VkLiBJbiBvcmRlclxuICogZm9yIGEgY2hpbGQgYW5pbWF0aW9uIHRvIHJ1biwgdGhlIHBhcmVudCBhbmltYXRpb24gbXVzdCBxdWVyeSBlYWNoIG9mIHRoZSBlbGVtZW50c1xuICogY29udGFpbmluZyBjaGlsZCBhbmltYXRpb25zLCBhbmQgcnVuIHRoZW0gdXNpbmcgdGhpcyBmdW5jdGlvbi5cbiAqXG4gKiBOb3RlIHRoYXQgdGhpcyBmZWF0dXJlIGlzIGRlc2lnbmVkIHRvIGJlIHVzZWQgd2l0aCBgcXVlcnkoKWAgYW5kIGl0IHdpbGwgb25seSB3b3JrXG4gKiB3aXRoIGFuaW1hdGlvbnMgdGhhdCBhcmUgYXNzaWduZWQgdXNpbmcgdGhlIEFuZ3VsYXIgYW5pbWF0aW9uIGxpYnJhcnkuIENTUyBrZXlmcmFtZXNcbiAqIGFuZCB0cmFuc2l0aW9ucyBhcmUgbm90IGhhbmRsZWQgYnkgdGhpcyBBUEkuXG4gKlxuICogQHB1YmxpY0FwaVxuICovXG5leHBvcnQgZnVuY3Rpb24gYW5pbWF0ZUNoaWxkKG9wdGlvbnM6IEFuaW1hdGVDaGlsZE9wdGlvbnN8bnVsbCA9IG51bGwpOlxuICAgIEFuaW1hdGlvbkFuaW1hdGVDaGlsZE1ldGFkYXRhIHtcbiAgcmV0dXJuIHt0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuQW5pbWF0ZUNoaWxkLCBvcHRpb25zfTtcbn1cblxuLyoqXG4gKiBTdGFydHMgYSByZXVzYWJsZSBhbmltYXRpb24gdGhhdCBpcyBjcmVhdGVkIHVzaW5nIHRoZSBgYW5pbWF0aW9uKClgIGZ1bmN0aW9uLlxuICpcbiAqIEBwYXJhbSBhbmltYXRpb24gVGhlIHJldXNhYmxlIGFuaW1hdGlvbiB0byBzdGFydC5cbiAqIEBwYXJhbSBvcHRpb25zIEFuIG9wdGlvbnMgb2JqZWN0IHRoYXQgY2FuIGNvbnRhaW4gYSBkZWxheSB2YWx1ZSBmb3IgdGhlIHN0YXJ0IG9mXG4gKiB0aGUgYW5pbWF0aW9uLCBhbmQgYWRkaXRpb25hbCBvdmVycmlkZSB2YWx1ZXMgZm9yIGRldmVsb3Blci1kZWZpbmVkIHBhcmFtZXRlcnMuXG4gKiBAcmV0dXJuIEFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIHRoZSBhbmltYXRpb24gcGFyYW1ldGVycy5cbiAqXG4gKiBAcHVibGljQXBpXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB1c2VBbmltYXRpb24oXG4gICAgYW5pbWF0aW9uOiBBbmltYXRpb25SZWZlcmVuY2VNZXRhZGF0YSxcbiAgICBvcHRpb25zOiBBbmltYXRpb25PcHRpb25zfG51bGwgPSBudWxsKTogQW5pbWF0aW9uQW5pbWF0ZVJlZk1ldGFkYXRhIHtcbiAgcmV0dXJuIHt0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuQW5pbWF0ZVJlZiwgYW5pbWF0aW9uLCBvcHRpb25zfTtcbn1cblxuLyoqXG4gKiBGaW5kcyBvbmUgb3IgbW9yZSBpbm5lciBlbGVtZW50cyB3aXRoaW4gdGhlIGN1cnJlbnQgZWxlbWVudCB0aGF0IGlzXG4gKiBiZWluZyBhbmltYXRlZCB3aXRoaW4gYSBzZXF1ZW5jZS4gVXNlIHdpdGggYGFuaW1hdGUoKWAuXG4gKlxuICogQHBhcmFtIHNlbGVjdG9yIFRoZSBlbGVtZW50IHRvIHF1ZXJ5LCBvciBhIHNldCBvZiBlbGVtZW50cyB0aGF0IGNvbnRhaW4gQW5ndWxhci1zcGVjaWZpY1xuICogY2hhcmFjdGVyaXN0aWNzLCBzcGVjaWZpZWQgd2l0aCBvbmUgb3IgbW9yZSBvZiB0aGUgZm9sbG93aW5nIHRva2Vucy5cbiAqICAtIGBxdWVyeShcIjplbnRlclwiKWAgb3IgYHF1ZXJ5KFwiOmxlYXZlXCIpYCA6IFF1ZXJ5IGZvciBuZXdseSBpbnNlcnRlZC9yZW1vdmVkIGVsZW1lbnRzLlxuICogIC0gYHF1ZXJ5KFwiOmFuaW1hdGluZ1wiKWAgOiBRdWVyeSBhbGwgY3VycmVudGx5IGFuaW1hdGluZyBlbGVtZW50cy5cbiAqICAtIGBxdWVyeShcIkB0cmlnZ2VyTmFtZVwiKWAgOiBRdWVyeSBlbGVtZW50cyB0aGF0IGNvbnRhaW4gYW4gYW5pbWF0aW9uIHRyaWdnZXIuXG4gKiAgLSBgcXVlcnkoXCJAKlwiKWAgOiBRdWVyeSBhbGwgZWxlbWVudHMgdGhhdCBjb250YWluIGFuIGFuaW1hdGlvbiB0cmlnZ2Vycy5cbiAqICAtIGBxdWVyeShcIjpzZWxmXCIpYCA6IEluY2x1ZGUgdGhlIGN1cnJlbnQgZWxlbWVudCBpbnRvIHRoZSBhbmltYXRpb24gc2VxdWVuY2UuXG4gKlxuICogQHBhcmFtIGFuaW1hdGlvbiBPbmUgb3IgbW9yZSBhbmltYXRpb24gc3RlcHMgdG8gYXBwbHkgdG8gdGhlIHF1ZXJpZWQgZWxlbWVudCBvciBlbGVtZW50cy5cbiAqIEFuIGFycmF5IGlzIHRyZWF0ZWQgYXMgYW4gYW5pbWF0aW9uIHNlcXVlbmNlLlxuICogQHBhcmFtIG9wdGlvbnMgQW4gb3B0aW9ucyBvYmplY3QuIFVzZSB0aGUgJ2xpbWl0JyBmaWVsZCB0byBsaW1pdCB0aGUgdG90YWwgbnVtYmVyIG9mXG4gKiBpdGVtcyB0byBjb2xsZWN0LlxuICogQHJldHVybiBBbiBvYmplY3QgdGhhdCBlbmNhcHN1bGF0ZXMgdGhlIHF1ZXJ5IGRhdGEuXG4gKlxuICogQHVzYWdlTm90ZXNcbiAqIFRva2VucyBjYW4gYmUgbWVyZ2VkIGludG8gYSBjb21iaW5lZCBxdWVyeSBzZWxlY3RvciBzdHJpbmcuIEZvciBleGFtcGxlOlxuICpcbiAqIGBgYHR5cGVzY3JpcHRcbiAqICBxdWVyeSgnOnNlbGYsIC5yZWNvcmQ6ZW50ZXIsIC5yZWNvcmQ6bGVhdmUsIEBzdWJUcmlnZ2VyJywgWy4uLl0pXG4gKiBgYGBcbiAqXG4gKiBUaGUgYHF1ZXJ5KClgIGZ1bmN0aW9uIGNvbGxlY3RzIG11bHRpcGxlIGVsZW1lbnRzIGFuZCB3b3JrcyBpbnRlcm5hbGx5IGJ5IHVzaW5nXG4gKiBgZWxlbWVudC5xdWVyeVNlbGVjdG9yQWxsYC4gVXNlIHRoZSBgbGltaXRgIGZpZWxkIG9mIGFuIG9wdGlvbnMgb2JqZWN0IHRvIGxpbWl0XG4gKiB0aGUgdG90YWwgbnVtYmVyIG9mIGl0ZW1zIHRvIGJlIGNvbGxlY3RlZC4gRm9yIGV4YW1wbGU6XG4gKlxuICogYGBganNcbiAqIHF1ZXJ5KCdkaXYnLCBbXG4gKiAgIGFuaW1hdGUoLi4uKSxcbiAqICAgYW5pbWF0ZSguLi4pXG4gKiBdLCB7IGxpbWl0OiAxIH0pXG4gKiBgYGBcbiAqXG4gKiBCeSBkZWZhdWx0LCB0aHJvd3MgYW4gZXJyb3Igd2hlbiB6ZXJvIGl0ZW1zIGFyZSBmb3VuZC4gU2V0IHRoZVxuICogYG9wdGlvbmFsYCBmbGFnIHRvIGlnbm9yZSB0aGlzIGVycm9yLiBGb3IgZXhhbXBsZTpcbiAqXG4gKiBgYGBqc1xuICogcXVlcnkoJy5zb21lLWVsZW1lbnQtdGhhdC1tYXktbm90LWJlLXRoZXJlJywgW1xuICogICBhbmltYXRlKC4uLiksXG4gKiAgIGFuaW1hdGUoLi4uKVxuICogXSwgeyBvcHRpb25hbDogdHJ1ZSB9KVxuICogYGBgXG4gKlxuICogIyMjIFVzYWdlIEV4YW1wbGVcbiAqXG4gKiBUaGUgZm9sbG93aW5nIGV4YW1wbGUgcXVlcmllcyBmb3IgaW5uZXIgZWxlbWVudHMgYW5kIGFuaW1hdGVzIHRoZW1cbiAqIGluZGl2aWR1YWxseSB1c2luZyBgYW5pbWF0ZSgpYC5cbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgc2VsZWN0b3I6ICdpbm5lcicsXG4gKiAgIHRlbXBsYXRlOiBgXG4gKiAgICAgPGRpdiBbQHF1ZXJ5QW5pbWF0aW9uXT1cImV4cFwiPlxuICogICAgICAgPGgxPlRpdGxlPC9oMT5cbiAqICAgICAgIDxkaXYgY2xhc3M9XCJjb250ZW50XCI+XG4gKiAgICAgICAgIEJsYWggYmxhaCBibGFoXG4gKiAgICAgICA8L2Rpdj5cbiAqICAgICA8L2Rpdj5cbiAqICAgYCxcbiAqICAgYW5pbWF0aW9uczogW1xuICogICAgdHJpZ2dlcigncXVlcnlBbmltYXRpb24nLCBbXG4gKiAgICAgIHRyYW5zaXRpb24oJyogPT4gZ29BbmltYXRlJywgW1xuICogICAgICAgIC8vIGhpZGUgdGhlIGlubmVyIGVsZW1lbnRzXG4gKiAgICAgICAgcXVlcnkoJ2gxJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcbiAqICAgICAgICBxdWVyeSgnLmNvbnRlbnQnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpLFxuICpcbiAqICAgICAgICAvLyBhbmltYXRlIHRoZSBpbm5lciBlbGVtZW50cyBpbiwgb25lIGJ5IG9uZVxuICogICAgICAgIHF1ZXJ5KCdoMScsIGFuaW1hdGUoMTAwMCwgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKSksXG4gKiAgICAgICAgcXVlcnkoJy5jb250ZW50JywgYW5pbWF0ZSgxMDAwLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpKSxcbiAqICAgICAgXSlcbiAqICAgIF0pXG4gKiAgXVxuICogfSlcbiAqIGNsYXNzIENtcCB7XG4gKiAgIGV4cCA9ICcnO1xuICpcbiAqICAgZ29BbmltYXRlKCkge1xuICogICAgIHRoaXMuZXhwID0gJ2dvQW5pbWF0ZSc7XG4gKiAgIH1cbiAqIH1cbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHF1ZXJ5KFxuICAgIHNlbGVjdG9yOiBzdHJpbmcsIGFuaW1hdGlvbjogQW5pbWF0aW9uTWV0YWRhdGF8QW5pbWF0aW9uTWV0YWRhdGFbXSxcbiAgICBvcHRpb25zOiBBbmltYXRpb25RdWVyeU9wdGlvbnN8bnVsbCA9IG51bGwpOiBBbmltYXRpb25RdWVyeU1ldGFkYXRhIHtcbiAgcmV0dXJuIHt0eXBlOiBBbmltYXRpb25NZXRhZGF0YVR5cGUuUXVlcnksIHNlbGVjdG9yLCBhbmltYXRpb24sIG9wdGlvbnN9O1xufVxuXG4vKipcbiAqIFVzZSB3aXRoaW4gYW4gYW5pbWF0aW9uIGBxdWVyeSgpYCBjYWxsIHRvIGlzc3VlIGEgdGltaW5nIGdhcCBhZnRlclxuICogZWFjaCBxdWVyaWVkIGl0ZW0gaXMgYW5pbWF0ZWQuXG4gKlxuICogQHBhcmFtIHRpbWluZ3MgQSBkZWxheSB2YWx1ZS5cbiAqIEBwYXJhbSBhbmltYXRpb24gT25lIG9yZSBtb3JlIGFuaW1hdGlvbiBzdGVwcy5cbiAqIEByZXR1cm5zIEFuIG9iamVjdCB0aGF0IGVuY2Fwc3VsYXRlcyB0aGUgc3RhZ2dlciBkYXRhLlxuICpcbiAqIEB1c2FnZU5vdGVzXG4gKiBJbiB0aGUgZm9sbG93aW5nIGV4YW1wbGUsIGEgY29udGFpbmVyIGVsZW1lbnQgd3JhcHMgYSBsaXN0IG9mIGl0ZW1zIHN0YW1wZWQgb3V0XG4gKiBieSBhbiBgbmdGb3JgLiBUaGUgY29udGFpbmVyIGVsZW1lbnQgY29udGFpbnMgYW4gYW5pbWF0aW9uIHRyaWdnZXIgdGhhdCB3aWxsIGxhdGVyIGJlIHNldFxuICogdG8gcXVlcnkgZm9yIGVhY2ggb2YgdGhlIGlubmVyIGl0ZW1zLlxuICpcbiAqIEVhY2ggdGltZSBpdGVtcyBhcmUgYWRkZWQsIHRoZSBvcGFjaXR5IGZhZGUtaW4gYW5pbWF0aW9uIHJ1bnMsXG4gKiBhbmQgZWFjaCByZW1vdmVkIGl0ZW0gaXMgZmFkZWQgb3V0LlxuICogV2hlbiBlaXRoZXIgb2YgdGhlc2UgYW5pbWF0aW9ucyBvY2N1ciwgdGhlIHN0YWdnZXIgZWZmZWN0IGlzXG4gKiBhcHBsaWVkIGFmdGVyIGVhY2ggaXRlbSdzIGFuaW1hdGlvbiBpcyBzdGFydGVkLlxuICpcbiAqIGBgYGh0bWxcbiAqIDwhLS0gbGlzdC5jb21wb25lbnQuaHRtbCAtLT5cbiAqIDxidXR0b24gKGNsaWNrKT1cInRvZ2dsZSgpXCI+U2hvdyAvIEhpZGUgSXRlbXM8L2J1dHRvbj5cbiAqIDxociAvPlxuICogPGRpdiBbQGxpc3RBbmltYXRpb25dPVwiaXRlbXMubGVuZ3RoXCI+XG4gKiAgIDxkaXYgKm5nRm9yPVwibGV0IGl0ZW0gb2YgaXRlbXNcIj5cbiAqICAgICB7eyBpdGVtIH19XG4gKiAgIDwvZGl2PlxuICogPC9kaXY+XG4gKiBgYGBcbiAqXG4gKiBIZXJlIGlzIHRoZSBjb21wb25lbnQgY29kZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQge3RyaWdnZXIsIHRyYW5zaXRpb24sIHN0eWxlLCBhbmltYXRlLCBxdWVyeSwgc3RhZ2dlcn0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG4gKiBAQ29tcG9uZW50KHtcbiAqICAgdGVtcGxhdGVVcmw6ICdsaXN0LmNvbXBvbmVudC5odG1sJyxcbiAqICAgYW5pbWF0aW9uczogW1xuICogICAgIHRyaWdnZXIoJ2xpc3RBbmltYXRpb24nLCBbXG4gKiAgICAgLi4uXG4gKiAgICAgXSlcbiAqICAgXVxuICogfSlcbiAqIGNsYXNzIExpc3RDb21wb25lbnQge1xuICogICBpdGVtcyA9IFtdO1xuICpcbiAqICAgc2hvd0l0ZW1zKCkge1xuICogICAgIHRoaXMuaXRlbXMgPSBbMCwxLDIsMyw0XTtcbiAqICAgfVxuICpcbiAqICAgaGlkZUl0ZW1zKCkge1xuICogICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAqICAgfVxuICpcbiAqICAgdG9nZ2xlKCkge1xuICogICAgIHRoaXMuaXRlbXMubGVuZ3RoID8gdGhpcy5oaWRlSXRlbXMoKSA6IHRoaXMuc2hvd0l0ZW1zKCk7XG4gKiAgICB9XG4gKiAgfVxuICogYGBgXG4gKlxuICogSGVyZSBpcyB0aGUgYW5pbWF0aW9uIHRyaWdnZXIgY29kZTpcbiAqXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiB0cmlnZ2VyKCdsaXN0QW5pbWF0aW9uJywgW1xuICogICB0cmFuc2l0aW9uKCcqID0+IConLCBbIC8vIGVhY2ggdGltZSB0aGUgYmluZGluZyB2YWx1ZSBjaGFuZ2VzXG4gKiAgICAgcXVlcnkoJzpsZWF2ZScsIFtcbiAqICAgICAgIHN0YWdnZXIoMTAwLCBbXG4gKiAgICAgICAgIGFuaW1hdGUoJzAuNXMnLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpXG4gKiAgICAgICBdKVxuICogICAgIF0pLFxuICogICAgIHF1ZXJ5KCc6ZW50ZXInLCBbXG4gKiAgICAgICBzdHlsZSh7IG9wYWNpdHk6IDAgfSksXG4gKiAgICAgICBzdGFnZ2VyKDEwMCwgW1xuICogICAgICAgICBhbmltYXRlKCcwLjVzJywgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKVxuICogICAgICAgXSlcbiAqICAgICBdKVxuICogICBdKVxuICogXSlcbiAqIGBgYFxuICpcbiAqIEBwdWJsaWNBcGlcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHN0YWdnZXIodGltaW5nczogc3RyaW5nfG51bWJlciwgYW5pbWF0aW9uOiBBbmltYXRpb25NZXRhZGF0YXxBbmltYXRpb25NZXRhZGF0YVtdKTpcbiAgICBBbmltYXRpb25TdGFnZ2VyTWV0YWRhdGEge1xuICByZXR1cm4ge3R5cGU6IEFuaW1hdGlvbk1ldGFkYXRhVHlwZS5TdGFnZ2VyLCB0aW1pbmdzLCBhbmltYXRpb259O1xufVxuIl19