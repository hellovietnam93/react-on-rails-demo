class PostRelayJob < ApplicationJob
  def perform post
    ActionCable.server.broadcast "posts", post unless post.destroyed?
  end
end
