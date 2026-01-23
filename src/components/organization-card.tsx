import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface OrganizationCardProps {
  orgName: string;
  orgId: string;
  logoImage: string;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  orgName,
  orgId,
  logoImage,
}) => {
  return (
    <Card className="w-70 h-70 flex flex-col justify-between items-center border-2 border-gray-300 p-3">
      <CardContent>
        <img
          className="w-40 h-40 rounded-full object-cover"
          src={logoImage}
          alt={orgName}
        />
      </CardContent>
      <span className="w-full border-b" />
      <CardFooter className="p-0 flex w-full justify-between items-center">
        <p className="text-xs text-gray-700">{orgName}</p>
        <Link
          to={`/my-organization/sermons/${encodeURIComponent(
            orgName
          )}/${encodeURIComponent(orgId)}`}
        >
          <Button
            type="button"
            className="bg-gray-700 hover:bg-gray-800 transition"
          >
            Org Page
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default OrganizationCard;
