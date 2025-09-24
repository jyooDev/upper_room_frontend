import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router";

interface OrganizationCardProps {
  orgName: string;
  orgId: string;
  logoImage: string;
  join?: boolean;
  onJoinClick?: (orgName: string) => void;
}

const OrganizationCard: React.FC<OrganizationCardProps> = ({
  orgName,
  orgId,
  logoImage,
  join = false,
  onJoinClick,
}) => {
  return (
    <Card
      className={`p-3 ${
        join ? "w-50 h-50" : "w-70 h-70"
      }} flex flex-col justify-between items-center border-2 border-gray-300`}
    >
      <CardContent>
        <img
          className={`${
            join ? "w-full h-full" : "w-40 h-40"
          } rounded-full object-cover`}
          src={logoImage}
          alt={orgName}
        />
      </CardContent>
      <span className="w-full border-b"></span>
      <CardFooter className="p-0 flex w-full justify-between items-center">
        {join ? (
          <>
            <p className="text-xs text-gray-700">{orgName}</p>
            <Button
              type="button"
              className="bg-gray-700 hover:bg-gray-800 transition"
              onClick={() => onJoinClick?.(orgName)}
            >
              Join
            </Button>
          </>
        ) : (
          <>
            <p className="text-xs text-gray-700">{orgName}</p>
            <Link
              to={`/my-organization/${encodeURIComponent(
                orgName
              )}/${orgId}/sermons`}
            >
              <Button
                type="button"
                className="bg-gray-700 hover:bg-gray-800 transition"
              >
                Org Page
              </Button>
            </Link>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default OrganizationCard;
