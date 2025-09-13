import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface OrganizationCardProps {
  orgName: string;
  logoImage: string;
}

const OrganizationCard = ({ orgName, logoImage }: OrganizationCardProps) => {
  return (
    <Card className="p-3 w-70 h-70 flex flex-col justify-between items-center border-2 border-gray-300">
      <CardContent>
        <img
          className="w-40 h-40 rounded-full object-cover"
          src={logoImage}
          alt={orgName}
        />
      </CardContent>
      <span className="w-full border-b"></span>
      <CardFooter className="p-0 flex w-full justify-between items-center">
        <p className="text-xs text-gray-700">{orgName}</p>
        <Button
          type="button"
          className="bg-gray-700 hover:bg-gray-800 transition"
        >
          Org Page
        </Button>
      </CardFooter>
    </Card>
  );
};

export default OrganizationCard;
