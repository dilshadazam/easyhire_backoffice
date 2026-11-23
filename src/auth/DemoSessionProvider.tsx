import { useState, type ReactNode } from 'react'
import { DemoSessionContext } from './DemoSessionContext'
import type { RoleId } from './roles'

export function DemoSessionProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<RoleId | null>(null)

  return (
    <DemoSessionContext.Provider
      value={{
        role,
        enterPreview: setRole,
        exitPreview: () => setRole(null),
      }}
    >
      {children}
    </DemoSessionContext.Provider>
  )
}
