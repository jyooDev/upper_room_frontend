import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface JoinOrganizationCardProps {
  orgName: string;
  orgId: string;
  logoImage: string;
  onJoinClick?: (orgName: string) => void;
}

const JoinOrganizationCard: React.FC<JoinOrganizationCardProps> = ({
  orgName,
  orgId,
  logoImage,
  onJoinClick,
}) => {
  return (
    <Card className="w-50 h-50 flex flex-col justify-between items-center border-2 border-gray-300 p-3">
      <CardContent>
        <img
          className="w-full h-full rounded-full object-cover"
          src={logoImage}
          alt={orgName}
        />
      </CardContent>
      <span className="w-full border-b" />
      <CardFooter className="p-0 flex w-full justify-between items-center">
        <p className="text-xs text-gray-700 truncate">{orgName}</p>
        <Button
          type="button"
          className="bg-gray-700 hover:bg-gray-800 transition"
          onClick={() => onJoinClick?.(orgName)}
        >
          Join
        </Button>
      </CardFooter>
    </Card>
  );
};

export default JoinOrganizationCard;
