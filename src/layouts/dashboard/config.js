import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SvgIcon } from "@mui/material";
import HomeSmileIcon from "src/icons/untitled-ui/duocolor/home-smile";
import AccessibilityIcon from "@mui/icons-material/Accessibility";
import LoyaltyIcon from "@mui/icons-material/Loyalty";

import Users03Icon from "src/icons/untitled-ui/duocolor/users-03";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import ShowChartIcon from "@mui/icons-material/ShowChart";
export const useSections = () => {
  const { t } = useTranslation();

  return useMemo(() => {
    return [
      {
        items: [
          {
            title: "Home",
            path: "/dashboard",
            icon: (
              <SvgIcon fontSize="small">
                <HomeSmileIcon />
              </SvgIcon>
            ),
          },
          {
            title: "memberships",
            path: "/dashboard/memberships",
            icon: (
              <SvgIcon>
                <LoyaltyIcon />
              </SvgIcon>
            ),
          },
          {
            title: "members",
            path: "/dashboard/members",
            icon: (
              <SvgIcon>
                <Users03Icon />
              </SvgIcon>
            ),
          },
          {
            title: "Attendence",
            path: "/dashboard/attendence",
            icon: (
              <SvgIcon>
                <AccessibilityIcon />
              </SvgIcon>
            ),
          },
          {
            title: "Expense",
            path: "/dashboard/expense",
            icon: (
              <SvgIcon>
                <CurrencyRupeeIcon />
              </SvgIcon>
            ),
          },
          {
            title: "Financial",
            path: "/dashboard/financial",
            icon: (
              <SvgIcon>
                <ShowChartIcon />
              </SvgIcon>
            ),
          },
        ],
      },
    ];
  }, [t]);
};
