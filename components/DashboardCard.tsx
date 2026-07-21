type DashboardCardProps = {
  title: string;
  value: number;
  description?: string;
  icon?: string;
};


export default function DashboardCard({
  title,
  value,
  description,
  icon
}: DashboardCardProps) {


  return (

    <div className="rounded-2xl bg-white p-6 shadow-sm border border-slate-200 hover:shadow-lg transition duration-300">


      <div className="flex items-center justify-between">


        <div>

          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>


          <h2 className="mt-3 text-4xl font-extrabold text-slate-900">
            {value}
          </h2>

        </div>



        {
          icon && (

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-3xl">

              {icon}

            </div>

          )
        }


      </div>





      {
        description && (

          <p className="mt-4 text-sm text-slate-500">
            {description}
          </p>

        )
      }



    </div>

  );

}