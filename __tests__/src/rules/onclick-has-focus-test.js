/**
 * @fileoverview Enforce that elements with onClick handlers must be focusable.
 * @author Ethan Cohen
 */

// -----------------------------------------------------------------------------
// Requirements
// -----------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/onclick-has-focus';

const parserOptions = {
  ecmaVersion: 6,
  ecmaFeatures: {
    jsx: true,
  },
};

// -----------------------------------------------------------------------------
// Tests
// -----------------------------------------------------------------------------

const ruleTester = new RuleTester();

const expectedError = {
  message: 'An non-interactive element with an onClick handler and an ' +
    'interactive role must be focusable. Either set the tabIndex property to ' +
    'a valid value (usually 0) or use an element type which is inherently ' +
    'focusable such as `button`.',
  type: 'JSXOpeningElement',
};

ruleTester.run('onclick-has-focus', rule, {
  valid: [
    { code: '<div />', parserOptions },
    { code: '<div aria-hidden onClick={() => void 0} />', parserOptions },
    { code: '<div aria-hidden={true == true} onClick={() => void 0} />', parserOptions },
    { code: '<div aria-hidden={true === true} onClick={() => void 0} />', parserOptions },
    { code: '<div aria-hidden={hidden !== false} onClick={() => void 0} />', parserOptions },
    { code: '<div aria-hidden={hidden != false} onClick={() => void 0} />', parserOptions },
    { code: '<div aria-hidden={1 < 2} onClick={() => void 0} />', parserOptions },
    { code: '<div aria-hidden={1 <= 2} onClick={() => void 0} />', parserOptions },
    { code: '<div aria-hidden={2 > 1} onClick={() => void 0} />', parserOptions },
    { code: '<div aria-hidden={2 >= 1} onClick={() => void 0} />', parserOptions },
    { code: '<div onClick={() => void 0} />;', parserOptions },
    { code: '<div onClick={() => void 0} tabIndex={undefined} />;', parserOptions },
    { code: '<div onClick={() => void 0} tabIndex="bad" />;', parserOptions },
    { code: '<div onClick={() => void 0} role={undefined} />;', parserOptions },
    { code: '<div role="section" onClick={() => void 0} />', parserOptions },
    { code: '<div onClick={() => void 0} aria-hidden={false} />;', parserOptions },
    { code: '<div onClick={() => void 0} {...props} />;', parserOptions },
    { code: '<input type="text" onClick={() => void 0} />', parserOptions },
    { code: '<input type="hidden" onClick={() => void 0} tabIndex="-1" />', parserOptions },
    { code: '<input type="hidden" onClick={() => void 0} tabIndex={-1} />', parserOptions },
    { code: '<input onClick={() => void 0} />', parserOptions },
    { code: '<input onClick={() => void 0} role="combobox" />', parserOptions },
    { code: '<button onClick={() => void 0} className="foo" />', parserOptions },
    { code: '<option onClick={() => void 0} className="foo" />', parserOptions },
    { code: '<select onClick={() => void 0} className="foo" />', parserOptions },
    { code: '<area href="#" onClick={() => void 0} className="foo" />', parserOptions },
    { code: '<area onClick={() => void 0} className="foo" />', parserOptions },
    { code: '<textarea onClick={() => void 0} className="foo" />', parserOptions },
    { code: '<a onClick="showNextPage();">Next page</a>', parserOptions },
    { code: '<a onClick="showNextPage();" tabIndex={undefined}>Next page</a>', parserOptions },
    { code: '<a onClick="showNextPage();" tabIndex="bad">Next page</a>', parserOptions },
    { code: '<a onClick={() => void 0} />', parserOptions },
    { code: '<a tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<a tabIndex={dynamicTabIndex} onClick={() => void 0} />', parserOptions },
    { code: '<a tabIndex={0} onClick={() => void 0} />', parserOptions },
    { code: '<a role="button" href="#" onClick={() => void 0} />', parserOptions },
    { code: '<a onClick={() => void 0} href="http://x.y.z" />', parserOptions },
    { code: '<a onClick={() => void 0} href="http://x.y.z" tabIndex="0" />', parserOptions },
    { code: '<a onClick={() => void 0} href="http://x.y.z" tabIndex={0} />', parserOptions },
    { code: '<a onClick={() => void 0} href="http://x.y.z" role="button" />', parserOptions },
    { code: '<TestComponent onClick={doFoo} />', parserOptions },
    { code: '<input onClick={() => void 0} type="hidden" />;', parserOptions },
    { code: '<span onClick="submitForm();">Submit</span>', errors: [expectedError], parserOptions },
    { code: '<span onClick="submitForm();" tabIndex={undefined}>Submit</span>', parserOptions },
    { code: '<span onClick="submitForm();" tabIndex="bad">Submit</span>', parserOptions },
    { code: '<span onClick="doSomething();" tabIndex="0">Click me!</span>', parserOptions },
    { code: '<span onClick="doSomething();" tabIndex={0}>Click me!</span>', parserOptions },
    { code: '<span onClick="doSomething();" tabIndex="-1">Click me too!</span>', parserOptions },
    {
      code: '<a href="javascript:void(0);" onClick="doSomething();">Click ALL the things!</a>',
      parserOptions,
    },
    { code: '<section onClick={() => void 0} />;', parserOptions },
    { code: '<main onClick={() => void 0} />;', parserOptions },
    { code: '<article onClick={() => void 0} />;', parserOptions },
    { code: '<header onClick={() => void 0} />;', parserOptions },
    { code: '<footer onClick={() => void 0} />;', parserOptions },
    { code: '<div role="button" tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<div role="checkbox" tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<div role="link" tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<div role="menuitem" tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<div role="menuitemcheckbox" tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<div role="menuitemradio" tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<div role="option" tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<div role="radio" tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<div role="spinbutton" tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<div role="switch" tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<div role="tab" tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<div role="textbox" tabIndex="0" onClick={() => void 0} />', parserOptions },
    { code: '<Foo.Bar onClick={() => void 0} aria-hidden={false} />;', parserOptions },
    { code: '<Input onClick={() => void 0} type="hidden" />;', parserOptions },
  ],

  invalid: [
    {
      code: '<span role="button" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<a role="button" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="button" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="checkbox" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="link" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="gridcell" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="menuitem" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="menuitemcheckbox" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="menuitemradio" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="option" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="radio" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="searchbox" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="slider" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="spinbutton" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="switch" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="tab" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="textbox" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
    {
      code: '<div role="treeitem" onClick={() => void 0} />',
      errors: [expectedError],
      parserOptions,
    },
  ],
});
