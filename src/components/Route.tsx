import React from 'react'
import { RouteProps } from '../types/index'

const Route = ({ component: Component, ...rest }: RouteProps) => (
  <Component {...rest} />
)

export default Route
