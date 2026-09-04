import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RedactionReview from '../components/RedactionReview.jsx'
import Workbench from '../components/Workbench.jsx'
import TopNav from '../components/TopNav.jsx'
import { org } from '../data/org/index.js'

/** Organization track. Same five stages as casework, different corpus. */
export default function OrgWorkbench() {
  const navigate = useNavigate()
  const [approved, setApproved] = useState(false)

  return (
    <>
      <TopNav onHome={() => navigate('/')} trail="Organization" />
      {approved ? (
        <Workbench corpus={org} />
      ) : (
        <RedactionReview
          docs={org.docs}
          spansByDoc={org.spansByDoc}
          header={org.redaction.header}
          mergedIdentity={org.redaction.mergedIdentity}
          callout={org.redaction.callout}
          calloutDoc={org.redaction.calloutDoc}
          onApprove={() => setApproved(true)}
        />
      )}
    </>
  )
}
