import React from 'react'
import { create } from 'react-test-renderer'
import { configure, shallow } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

import { GoogleLogin } from '../src'

configure({ adapter: new Adapter() })

describe('Google Login', () => {
  const defaultText = 'Login with Google'

  describe('With default props', () => {
    const props = {
      onSuccess() {},
      onFailure() {},
      clientId: '840926923902-a6mbee0n6srst13qb90eseeplf42r88a.apps.googleusercontent.com'
    }

    test('render the button', () => {
      const component = create(<GoogleLogin {...props} />)
      const tree = component.toJSON()
      expect(tree).toMatchSnapshot()
    })

    const button = shallow(<GoogleLogin {...props} />)

    test('displays correct button text', () => {
      expect(button.text()).toEqual(defaultText)
    })

    test('does not have a class attr', () => {
      expect(button.prop('className')).toEqual(undefined)
    })

    test('has inline styles', () => {
      expect(button.prop('style')).toMatchSnapshot()
    })

    test('displays a button element when tag prop is not set', () => {
      expect(button.type()).toEqual('button')
    })
  })
}
