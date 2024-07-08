import { Weight } from "@/app/lib/definitions";
import UpdateButton from "./UpdateButton";
import DeleteButton from "./DeleteButton";

const WeightTable = ({ weights }: { weights: Weight[] }) => {
  return (
    <div className="flex flex-col">
      {weights?.map((weight) => (
        <div key={weight.id} className="flex justify-evenly">
          <p>{weight.weight}</p>
          <p>{weight.date.toISOString().split("T")[0]}</p>
          <UpdateButton id={weight.id} />
          <DeleteButton id={weight.id} />
        </div>
      ))}
    </div>
  );
};

export default WeightTable;
