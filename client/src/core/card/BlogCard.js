import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core"
import React from "react"
import { API } from "../../utils/backend"
import { ImageLoading } from "../components/ImageLoading"

export const BlogCard = ({ blog }) => {
  const date = new Date(blog.createdAt)
  return (
    <div className="col-md-6 my-3">
      <Card>
        <CardActionArea>
          <ImageLoading
            imgUrl={`${API}/blog/picture/${blog._id}`}
            width="100%"
            height="300px"
          />
          <CardContent>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h6" component="h2">
                  {blog.title}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="caption" >
                  {date.toDateString()}
                </Typography>
              </Grid>
            </Grid>
            <Typography variant="caption">{blog.tagline}</Typography>
            <Typography variant="body2" color="textSecondary" component="p">
{
  blog.content
}            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Grid container justify="flex-end">
          <Button size="small" color="primary">
            Share
          </Button>
          <Button size="small" color="primary">
            Read more
          </Button>
          </Grid>
        </CardActions>
      </Card>
    </div>
  )
}
