import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import {
  consumeAuthCallbackError,
  createSupabaseGateway,
  readPublicSupabaseConfig,
} from './lib/cloud';
import { FakeCloudGateway } from './lib/fake-cloud';
import './styles.css';

const config = readPublicSupabaseConfig();
const authCallbackMessage = consumeAuthCallbackError();
const gateway = import.meta.env.VITE_E2E_FAKE_CLOUD === 'true'
  ? new FakeCloudGateway()
  : config
    ? createSupabaseGateway(config)
    : null;

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App gateway={gateway} authCallbackMessage={authCallbackMessage} />
  </StrictMode>,
);
