// Replace placeholders with verified results. Local video paths go in public/assets/.
export const creatives = Array.from({length:4},(_,index)=>({
 id:index+1, hook:'[Creative hook]', hypothesis:'[What this creative was testing.]',
 audience:'[Target audience and messaging angle.]', video:null, url:null,
 metrics:{Views:null,'Watch time':null,Shares:null,Saves:null,Follows:null},
 learning:'[What the result suggests, its limitations, and the next iteration.]'
}));
