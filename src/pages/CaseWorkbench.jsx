import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import RedactionReview from '../components/RedactionReview.jsx'
import Workbench from '../components/Workbench.jsx'
import TopNav from '../components/TopNav.jsx'
import { client1 } from '../data/clinical/client1/index.js'
import { client2 } from '../data/clinical/client2/index.js'

const CLIENTS = [client1, client2]

/**
 * Casework track.
 *
 * The client code gate specified in spec section 2 is disabled. The demo opens
 * straight onto the corpus so a walkthrough starts at the redaction screen
 * rather than at a form.
 */
export default function CaseWorkbench() {
  const navigate = useNavigate()
  const [clientId, setClientId] = useState(client1.id)
  const [approved, setApproved] = useState({})
  const corpus = CLIENTS.find((c) => c.id === clientId)

  const switchClient = (id) => setClientId(id)

  return (
    <>
      <TopNav
        onHome={() => navigate('/')}
        trail="Casework"
        tabs={CLIENTS.map((c) => ({ id: c.id, label: c.sidebarLabel, meta: c.sidebarMeta }))}
        activeTab={clientId}
        onTab={switchClient}
      />
      {approved[clientId] ? (
        <Workbench key={clientId} corpus={corpus} />
      ) : (
        <RedactionReview
          key={clientId}
          docs={corpus.docs}
          spansByDoc={corpus.spansByDoc}
          header={corpus.redaction.header}
          mergedIdentity={corpus.redaction.mergedIdentity}
          onApprove={() => setApproved((prev) => ({ ...prev, [clientId]: true }))}
        />
      )}
    </>
  )
}
