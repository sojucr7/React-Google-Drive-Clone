import store from './store';
import { Provider } from 'react-redux'
import {cleanup, render} from '@testing-library/react'
import {BrowserRouter,Router} from "react-router-dom"
import userEvent from '@testing-library/user-event'

const AllTheProviders = ({children}) => {
  return (
    <Provider store={store}>
        <BrowserRouter>            
            {children}
        </BrowserRouter>
    </Provider>
  )
}



const customRender = (ui, options) => {
    return {
      user: userEvent.setup(),
      ...render(ui, {wrapper: AllTheProviders, ...options}),
    }
}

// re-export everything
export * from '@testing-library/react'

// override render method
export {customRender as render}