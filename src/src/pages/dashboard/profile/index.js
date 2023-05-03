import { useCallback, useEffect, useState } from "react";

import {
  Avatar,
  Box,
  Container,
  Divider,
  Stack,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import { Seo } from "src/components/seo";
import { Layout as DashboardLayout } from "src/layouts/dashboard";
import { useSelector } from "react-redux";
import { Form4 } from "src/sections/components/forms/form-4";
import { DetailList5 } from "src/sections/components/detail-lists/detail-list-5";
import { useSession } from "next-auth/react";
const tabs = [
  { label: "Profile", value: "Profile" },
  { label: "Edit", value: "Edit" },
];

export const Page = () => {
  const [currentTab, setCurrentTab] = useState("Profile");
  const session = useSession();

  const handleTabsChange = useCallback((event, value) => {
    setCurrentTab(value);
  }, []);

  return (
    <>
      <Seo title="Dashboard: Social Profile" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <div>
            <Stack
              alignItems="center"
              direction="row"
              spacing={2}
              sx={{ mt: 5 }}
            >
              <Stack alignItems="center" direction="row" spacing={2}>
                <Avatar
                  sx={{
                    height: 64,
                    width: 64,
                  }}
                />
                <div>
                  <Typography color="text.secondary" variant="overline">
                    {session?.data?.user?.name}
                  </Typography>
                  <Typography variant="h6">
                    {session?.data?.user?.email}
                  </Typography>
                </div>
              </Stack>
              <Box sx={{ flexGrow: 1 }} />
            </Stack>
          </div>
          <Tabs
            indicatorColor="primary"
            onChange={handleTabsChange}
            scrollButtons="auto"
            sx={{ mt: 5 }}
            textColor="primary"
            value={currentTab}
            variant="scrollable"
          >
            {tabs.map((tab) => (
              <Tab key={tab.value} label={tab.label} value={tab.value} />
            ))}
          </Tabs>
          <Divider />
          <Box sx={{ mt: 3 }}>
            {currentTab === "Profile" && (
              <>
                <DetailList5 />
              </>
            )}
            {currentTab === "Edit" && <Form4 />}
          </Box>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;
