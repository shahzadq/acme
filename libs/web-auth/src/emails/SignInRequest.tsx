import {
  Body,
  Button,
  Container,
  Font,
  Head,
  Heading,
  Hr,
  Html,
  Section,
  Text,
} from "@react-email/components";

export default function SignInRequestEmail({ href }: { href: string }) {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        <Font fontFamily="Inter" fallbackFontFamily="sans-serif" />
      </Head>
      <Body>
        <Container>
          <Text style={{ color: "rgba(0,0,0,0.75)", fontWeight: "bold" }}>
            acme
          </Text>
          <Section style={{ margin: "16px 0" }}>
            <Heading>Sign In request</Heading>
            <Text>
              Click the link below to sign in to acme. If you don't recognise
              this request, do nothing.
            </Text>
            <Button
              href={href}
              target="_blank"
              style={{
                width: "100%",
                padding: "8px 16px",
                borderRadius: "8px",
                backgroundColor: "rgba(0,0,0,1)",
                color: "rgba(255,255,255,1)",
                textAlign: "center",
              }}
            >
              Sign In to acme
            </Button>
          </Section>
          <Hr />
          <Text>
            The above link will expire in 10 minutes (from the time of the
            request). Please do not share it with anyone.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

SignInRequestEmail.PreviewProps = {
  href: "https://google.co.uk",
};
