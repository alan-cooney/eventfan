import { Container } from "react-bootstrap";
import { useEffect } from "react";
import {
  FacebookPixel,
  GA4,
  Hotjar,
  Posthog,
  EventFanProvider,
  useEventFan,
} from "../../..";

function Page() {
  const { page } = useEventFan();

  useEffect(() => {
    page();
  });

  return null;
}

function App() {
  return (
    <div>
      <EventFanProvider
        config={{
          destinations: [
            new FacebookPixel({ pixelId: "243635977408985" }),
            new GA4({ measurementId: "GTM-TNBDGJR" }),
            new Hotjar({ siteID: "2705682" }),
            new Posthog({
              teamApiKey: "phc_CrjkOExGDLy4CXCwuht6eEIHDM7VDNsTXAI3tpTATim",
            }),
          ],
        }}
      >
        <Container>
          <h1>EventFan React Test</h1>
          <Page />
        </Container>
      </EventFanProvider>
    </div>
  );
}

export default App;
