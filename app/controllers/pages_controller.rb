class PagesController < ApplicationController
  include ReactOnRails::Controller
  before_action :load_posts

  def index
    # NOTE: The below notes apply if you want to set the value of the props in the controller, as
    # compared to the view. However, it's more convenient to use Jbuilder from the view. See
    # app/views/pages/index.html.erb:20
    #
    #  <%= react_component('App', props: render(template: "/posts/index.json.jbuilder"),
    #     prerender: true) %>
    #
    #
    # NOTE: this could be an alternate syntax if you wanted to pass posts as a variable to a partial
    # @posts_json_sting = render_to_string(partial: "/posts/posts.json.jbuilder",
    #                                         locals: { posts: Post.all }, format: :json)
    # NOTE: @posts is used by the render_to_string call
    # @posts_json_string = render_to_string("/posts/index.json.jbuilder")
    # NOTE: It's CRITICAL to call respond_to after calling render_to_string, or else Rails will
    # not render the HTML version of the index page properly. (not a problem if you do this in the view)
    # respond_to do |format|
    #   format.html
    # end

    redux_store "routerPostsStore", props: posts_json_string
    render_html
  end

  # Declaring no_router and simple to indicate we have views for them
  def no_router
    redux_store "postsStore", props: posts_json_string
    render_html
  end

  def simple
  end

  private
  def load_posts
    @posts = Post.all.order id: :desc
  end

  def posts_json_string
    render_to_string template: "/posts/index.json.jbuilder",
      locals: {posts: Post.all}, format: :json
  end

  def render_html
    respond_to do |format|
      format.html
    end
  end
end
