import {
  Box,
  Card,
  Page,
  Text,
  BlockStack,
  InlineGrid,
  TextField,
  useBreakpoints,
  Divider,
  Button,
} from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useEffect, useState } from "react";
import type { ActionFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData, Form } from "@remix-run/react";
interface FormState {
  name: string;
  description: string;
}

export async function loader() {
  // provides data to the component
  let settings = {
    name: "My app",
    description: "My app description",
  };
  return json(settings);
}

export const action: ActionFunction = async ({ request }) => {
  let formData = await request.formData();
  let settings = Object.fromEntries(formData);
  return json(settings);
};

export default function SettingsPage() {
  const settings = useLoaderData<FormState>();
  const { smUp } = useBreakpoints();
  const [formState, setFormState] = useState<FormState>({ name: "", description: "" })
  useEffect(() => {
    // Initialize formState after settings data has loaded
    setFormState({ name: settings.name, description: settings.description });
  }, [settings]);

  return (
    <Page>
      <TitleBar title="Settings" />
      <BlockStack gap={{ xs: "800", sm: "400" }}>
        <InlineGrid columns={{ xs: "1fr", md: "2fr 5fr" }} gap="400">
          <Box
            as="section"
            paddingInlineStart={{ xs: "400", sm: "0" }}
            paddingInlineEnd={{ xs: "400", sm: "0" }}
          >
            <BlockStack gap="400">
              <Text as="h3" variant="headingMd">
                Settings
              </Text>
              <Text as="p" variant="bodyMd">
                Update app settings preferences
              </Text>
            </BlockStack>
          </Box>
          <Card roundedAbove="sm">
            <Form method="POST">
              <BlockStack gap="400">
                <TextField
                  label="App"
                  name="name"
                  value={formState.name}
                  onChange={(value) => setFormState({ ...formState, name: value })}
                  autoComplete="off"
                />
                <TextField
                  label="Description"
                  name="description"
                  value={formState.description}
                  onChange={(value) => setFormState({ ...formState, description: value })}
                  autoComplete="off"
                />
              </BlockStack>
              <Button submit={true}>Save</Button>
            </Form>
          </Card>
        </InlineGrid>
        {smUp ? <Divider /> : null}
      </BlockStack>
    </Page>
  );
}

// function Code({ children }: { children: React.ReactNode }) {
//   return (
//     <Box
//       as="span"
//       padding="025"
//       paddingInlineStart="100"
//       paddingInlineEnd="100"
//       background="bg-surface-active"
//       borderWidth="025"
//       borderColor="border"
//       borderRadius="100"
//     >
//       <code>{children}</code>
//     </Box>
//   );
// }
