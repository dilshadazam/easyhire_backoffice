import { createContext, useContext } from 'react'
import type { RoleId } from './roles'

interface DemoSessionContextValue {
  role: RoleId | null
  enterPreview: (role: RoleId) => void
  exitPreview: () => void
}

const DemoSessionContext = createContext<DemoSessionContextValue | null>(null)

export function useDemoSession() {
  const context = useContext(DemoSessionContext)

  if (!context) {
    throw new Error('useDemoSession must be used within DemoSessionProvider.')
  }

  return context
}

export { DemoSessionContext }
