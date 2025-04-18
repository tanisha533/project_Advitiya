'use client'

import { useState } from 'react'
import { ChevronDownIcon, EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { Field, Label, Switch } from '@headlessui/react'

export default function Ngosign() {
  const [agreed, setAgreed] = useState(false)
  const [state, setState] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-32 lg:px-8 relative">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
          NGO Registration
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Join our network of organizations making a difference in the world.
        </p>
      </div>
      <form className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="block text-sm font-semibold leading-6 text-gray-900">
              First name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="first-name"
                autoComplete="given-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="last-name" className="block text-sm font-semibold leading-6 text-gray-900">
              Last name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="last-name"
                autoComplete="family-name"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="organization" className="block text-sm font-semibold leading-6 text-gray-900">
              Organization Name
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="organization"
                autoComplete="organization"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <div className="mt-2.5">
              <input
                type="email"
                id="email"
                autoComplete="email"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2 relative">
            <label htmlFor="password" className="block text-sm font-semibold leading-6 text-gray-900">
              Password
            </label>
            <div className="mt-2.5 relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="new-password"
                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                title="Must contain at least 8 characters, one uppercase, one lowercase, one number, and one special character"
                required
                className="block w-full rounded-md border-0 px-3.5 py-2 pr-10 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-gray-900">
              Phone number
            </label>
            <div className="mt-2.5">
              <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <div className="relative flex items-center">
                  <select
                    id="country"
                    name="country"
                    className="h-full rounded-md border-0 bg-transparent py-0 pl-3 pr-7 text-gray-500 focus:outline-none focus:ring-0 sm:text-sm"
                  >
                    <option>US</option>
                    <option>IN</option>
                  </select>
                  <ChevronDownIcon
                    className="pointer-events-none absolute right-2 top-3 h-4 w-4 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
                <input
                  type="tel"
                  id="phone-number"
                  autoComplete="tel"
                  className="block w-full border-0 bg-transparent px-3.5 py-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="123-456-7890"
                />
              </div>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="postal-code" className="block text-sm font-semibold leading-6 text-gray-900">
              Postal Code
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="postal-code"
                autoComplete="postal-code"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="colony" className="block text-sm font-semibold leading-6 text-gray-900">
              Colony/Area
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="colony"
                autoComplete="address-line1"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-semibold leading-6 text-gray-900">
              City
            </label>
            <div className="mt-2.5">
              <input
                type="text"
                id="city"
                autoComplete="address-level2"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <label htmlFor="state" className="block text-sm font-semibold leading-6 text-gray-900">
              State
            </label>
            <div className="mt-2.5 relative">
              <select
                id="state"
                name="state"
                autoComplete="address-level1"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={state}
                onChange={(e) => setState(e.target.value)}
              >
                <option value="">Select State</option>
                <option>Maharashtra</option>
                <option>Delhi</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
                <option>Uttar Pradesh</option>
              </select>
              <ChevronDownIcon
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </div>
          </div>

          <Field as="div" className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={setAgreed}
                className="flex w-8 flex-none cursor-pointer rounded-full p-px transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bg-gray-200 data-[checked]:bg-indigo-600"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out data-[checked]:translate-x-3.5"
                />
              </Switch>
            </div>
            <Label className="text-sm leading-6 text-gray-600">
              I agree to the{' '}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
            </Label>
          </Field>
        </div>

        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Create Account
          </button>
        </div>
      </form>
    </div>
  )
}
