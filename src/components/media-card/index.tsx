import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

interface MediaCardProps {
  url?: string;
  cardMinWidth?: number;
  cardMaxWidth?: number;
  mediaHeight?: string;
  mediaUrl: string;
  mediaAlt?: string;
  title: string;
  description?: string;
  actions?: React.ReactNode | null;
}

export default function MediaCard({
  url,
  cardMinWidth,
  cardMaxWidth,
  mediaHeight,
  mediaUrl,
  mediaAlt,
  title,
  description,
  actions,
}: MediaCardProps) {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        maxWidth: cardMaxWidth,
        minWidth: cardMinWidth,
        cursor: url ? "pointer" : "default",
      }}
      onClick={() => !!url && navigate(url)}
    >
      <CardMedia
        component="img"
        height={mediaHeight}
        image={mediaUrl}
        alt={mediaAlt}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="p" fontWeight="bold">
          {title}
        </Typography>
        {!!description && (
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        )}
      </CardContent>
      {!!actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
}

MediaCard.defaultProps = {
  cardMaxWidth: 345,
  cardMinWidth: 200,
  mediaHeight: "140",
  mediaAlt: "photo",
  description: "",
  actions: null,
  url: undefined,
};
